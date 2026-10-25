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
    public class CPKST_GateOutDetails
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
    public partial class CVarST_GateOutDetails : CPKST_GateOutDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mST_GateOutID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int64 mOperationID;
        internal Int64 mST_PreGateInDetailsID;
        internal Boolean misGateOut;
        internal Int64 mST_PreGateInID;
        #endregion

        #region "Methods"
        public Int32 ST_GateOutID
        {
            get { return mST_GateOutID; }
            set { mIsChanges = true; mST_GateOutID = value; }
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
        public Boolean isGateOut
        {
            get { return misGateOut; }
            set { mIsChanges = true; misGateOut = value; }
        }
        public Int64 ST_PreGateInID
        {
            get { return mST_PreGateInID; }
            set { mIsChanges = true; mST_PreGateInID = value; }
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

    public partial class CST_GateOutDetails
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
        public List<CVarST_GateOutDetails> lstCVarST_GateOutDetails = new List<CVarST_GateOutDetails>();
        public List<CPKST_GateOutDetails> lstDeletedCPKST_GateOutDetails = new List<CPKST_GateOutDetails>();
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
            lstCVarST_GateOutDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_GateOutDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_GateOutDetails";
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
                        CVarST_GateOutDetails ObjCVarST_GateOutDetails = new CVarST_GateOutDetails();
                        ObjCVarST_GateOutDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_GateOutDetails.mST_GateOutID = Convert.ToInt32(dr["ST_GateOutID"].ToString());
                        ObjCVarST_GateOutDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_GateOutDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_GateOutDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_GateOutDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarST_GateOutDetails.misGateOut = Convert.ToBoolean(dr["isGateOut"].ToString());
                        ObjCVarST_GateOutDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        lstCVarST_GateOutDetails.Add(ObjCVarST_GateOutDetails);
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
            lstCVarST_GateOutDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_GateOutDetails";
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
                        CVarST_GateOutDetails ObjCVarST_GateOutDetails = new CVarST_GateOutDetails();
                        ObjCVarST_GateOutDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_GateOutDetails.mST_GateOutID = Convert.ToInt32(dr["ST_GateOutID"].ToString());
                        ObjCVarST_GateOutDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_GateOutDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_GateOutDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_GateOutDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarST_GateOutDetails.misGateOut = Convert.ToBoolean(dr["isGateOut"].ToString());
                        ObjCVarST_GateOutDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_GateOutDetails.Add(ObjCVarST_GateOutDetails);
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
                    Com.CommandText = "[dbo].DeleteListST_GateOutDetails";
                else
                    Com.CommandText = "[dbo].UpdateListST_GateOutDetails";
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
        public Exception DeleteItem(List<CPKST_GateOutDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_GateOutDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKST_GateOutDetails ObjCPKST_GateOutDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_GateOutDetails.ID);
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
        public Exception SaveMethod(List<CVarST_GateOutDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ST_GateOutID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ST_PreGateInDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@isGateOut", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ST_PreGateInID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_GateOutDetails ObjCVarST_GateOutDetails in SaveList)
                {
                    if (ObjCVarST_GateOutDetails.mIsChanges == true)
                    {
                        if (ObjCVarST_GateOutDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_GateOutDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_GateOutDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_GateOutDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_GateOutDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_GateOutDetails.ID;
                        }
                        Com.Parameters["@ST_GateOutID"].Value = ObjCVarST_GateOutDetails.ST_GateOutID;
                        Com.Parameters["@ContainerID"].Value = ObjCVarST_GateOutDetails.ContainerID;
                        Com.Parameters["@ContainerNumber"].Value = ObjCVarST_GateOutDetails.ContainerNumber;
                        Com.Parameters["@OperationID"].Value = ObjCVarST_GateOutDetails.OperationID;
                        Com.Parameters["@ST_PreGateInDetailsID"].Value = ObjCVarST_GateOutDetails.ST_PreGateInDetailsID;
                        Com.Parameters["@isGateOut"].Value = ObjCVarST_GateOutDetails.isGateOut;
                        Com.Parameters["@ST_PreGateInID"].Value = ObjCVarST_GateOutDetails.ST_PreGateInID;
                        EndTrans(Com, Con);
                        if (ObjCVarST_GateOutDetails.ID == 0)
                        {
                            ObjCVarST_GateOutDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_GateOutDetails.mIsChanges = false;
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
