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
    public class CPKST_GateInDetails
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
    public partial class CVarST_GateInDetails : CPKST_GateInDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mST_GateInID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int64 mOperationID;
        internal Int64 mST_PreGateInDetailsID;
        internal Boolean misGateIn;
        internal Int64 mST_PreGateInID;
        internal String mPO;
        #endregion

        #region "Methods"
        public Int32 ST_GateInID
        {
            get { return mST_GateInID; }
            set { mIsChanges = true; mST_GateInID = value; }
        }
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mIsChanges = true; mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mIsChanges = true; mContainerNumber = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 ST_PreGateInDetailsID
        {
            get { return mST_PreGateInDetailsID; }
            set { mIsChanges = true; mST_PreGateInDetailsID = value; }
        }
        public Boolean isGateIn
        {
            get { return misGateIn; }
            set { mIsChanges = true; misGateIn = value; }
        }
        public Int64 ST_PreGateInID
        {
            get { return mST_PreGateInID; }
            set { mIsChanges = true; mST_PreGateInID = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mIsChanges = true; mPO = value; }
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

    public partial class CST_GateInDetails
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
        public List<CVarST_GateInDetails> lstCVarST_GateInDetails = new List<CVarST_GateInDetails>();
        public List<CPKST_GateInDetails> lstDeletedCPKST_GateInDetails = new List<CPKST_GateInDetails>();
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
            lstCVarST_GateInDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_GateInDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_GateInDetails";
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
                        CVarST_GateInDetails ObjCVarST_GateInDetails = new CVarST_GateInDetails();
                        ObjCVarST_GateInDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_GateInDetails.mST_GateInID = Convert.ToInt32(dr["ST_GateInID"].ToString());
                        ObjCVarST_GateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_GateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_GateInDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_GateInDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarST_GateInDetails.misGateIn = Convert.ToBoolean(dr["isGateIn"].ToString());
                        ObjCVarST_GateInDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarST_GateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        lstCVarST_GateInDetails.Add(ObjCVarST_GateInDetails);
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
            lstCVarST_GateInDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_GateInDetails";
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
                        CVarST_GateInDetails ObjCVarST_GateInDetails = new CVarST_GateInDetails();
                        ObjCVarST_GateInDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_GateInDetails.mST_GateInID = Convert.ToInt32(dr["ST_GateInID"].ToString());
                        ObjCVarST_GateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_GateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_GateInDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_GateInDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarST_GateInDetails.misGateIn = Convert.ToBoolean(dr["isGateIn"].ToString());
                        ObjCVarST_GateInDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarST_GateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_GateInDetails.Add(ObjCVarST_GateInDetails);
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
                    Com.CommandText = "[dbo].DeleteListST_GateInDetails";
                else
                    Com.CommandText = "[dbo].UpdateListST_GateInDetails";
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
        public Exception DeleteItem(List<CPKST_GateInDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_GateInDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKST_GateInDetails ObjCPKST_GateInDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_GateInDetails.ID);
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
        public Exception SaveMethod(List<CVarST_GateInDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ST_GateInID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ST_PreGateInDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@isGateIn", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ST_PreGateInID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PO", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_GateInDetails ObjCVarST_GateInDetails in SaveList)
                {
                    if (ObjCVarST_GateInDetails.mIsChanges == true)
                    {
                        if (ObjCVarST_GateInDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_GateInDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_GateInDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_GateInDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_GateInDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_GateInDetails.ID;
                        }
                        Com.Parameters["@ST_GateInID"].Value = ObjCVarST_GateInDetails.ST_GateInID;
                        Com.Parameters["@ContainerID"].Value = ObjCVarST_GateInDetails.ContainerID;
                        Com.Parameters["@ContainerNumber"].Value = ObjCVarST_GateInDetails.ContainerNumber;
                        Com.Parameters["@OperationID"].Value = ObjCVarST_GateInDetails.OperationID;
                        Com.Parameters["@ST_PreGateInDetailsID"].Value = ObjCVarST_GateInDetails.ST_PreGateInDetailsID;
                        Com.Parameters["@isGateIn"].Value = ObjCVarST_GateInDetails.isGateIn;
                        Com.Parameters["@ST_PreGateInID"].Value = ObjCVarST_GateInDetails.ST_PreGateInID;
                        Com.Parameters["@PO"].Value = ObjCVarST_GateInDetails.PO;
                        EndTrans(Com, Con);
                        if (ObjCVarST_GateInDetails.ID == 0)
                        {
                            ObjCVarST_GateInDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_GateInDetails.mIsChanges = false;
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
