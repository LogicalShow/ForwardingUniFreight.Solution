using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKVehicleAction
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
    public partial class CVarVehicleAction : CPKVehicleAction
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationVehicleID;
        internal Int64 mReceiveDetailsID;
        internal Int32 mVehicleActionID;
        internal DateTime mActionDate;
        internal String mInspectionNotes;
        internal Int32 mRowLocationID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mFromWarehouseID;
        internal Int32 mToWarehouseID;
        internal Int64 mCodeSerial;
        internal Int32 mLine;
        internal Boolean mIsCancelled;
        internal Int32 mTruckerID;
        #endregion

        #region "Methods"
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 ReceiveDetailsID
        {
            get { return mReceiveDetailsID; }
            set { mIsChanges = true; mReceiveDetailsID = value; }
        }
        public Int32 VehicleActionID
        {
            get { return mVehicleActionID; }
            set { mIsChanges = true; mVehicleActionID = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mIsChanges = true; mActionDate = value; }
        }
        public String InspectionNotes
        {
            get { return mInspectionNotes; }
            set { mIsChanges = true; mInspectionNotes = value; }
        }
        public Int32 RowLocationID
        {
            get { return mRowLocationID; }
            set { mIsChanges = true; mRowLocationID = value; }
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
        public Int32 FromWarehouseID
        {
            get { return mFromWarehouseID; }
            set { mIsChanges = true; mFromWarehouseID = value; }
        }
        public Int32 ToWarehouseID
        {
            get { return mToWarehouseID; }
            set { mIsChanges = true; mToWarehouseID = value; }
        }
        public Int64 CodeSerial
        {
            get { return mCodeSerial; }
            set { mIsChanges = true; mCodeSerial = value; }
        }
        public Int32 Line
        {
            get { return mLine; }
            set { mIsChanges = true; mLine = value; }
        }
        public Boolean IsCancelled
        {
            get { return mIsCancelled; }
            set { mIsChanges = true; mIsCancelled = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
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

    public partial class CVehicleAction
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
        public List<CVarVehicleAction> lstCVarVehicleAction = new List<CVarVehicleAction>();
        public List<CPKVehicleAction> lstDeletedCPKVehicleAction = new List<CPKVehicleAction>();
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
            lstCVarVehicleAction.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListVehicleAction";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemVehicleAction";
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
                        CVarVehicleAction ObjCVarVehicleAction = new CVarVehicleAction();
                        ObjCVarVehicleAction.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVehicleAction.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarVehicleAction.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarVehicleAction.mVehicleActionID = Convert.ToInt32(dr["VehicleActionID"].ToString());
                        ObjCVarVehicleAction.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarVehicleAction.mInspectionNotes = Convert.ToString(dr["InspectionNotes"].ToString());
                        ObjCVarVehicleAction.mRowLocationID = Convert.ToInt32(dr["RowLocationID"].ToString());
                        ObjCVarVehicleAction.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarVehicleAction.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarVehicleAction.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarVehicleAction.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarVehicleAction.mFromWarehouseID = Convert.ToInt32(dr["FromWarehouseID"].ToString());
                        ObjCVarVehicleAction.mToWarehouseID = Convert.ToInt32(dr["ToWarehouseID"].ToString());
                        ObjCVarVehicleAction.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarVehicleAction.mLine = Convert.ToInt32(dr["Line"].ToString());
                        ObjCVarVehicleAction.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarVehicleAction.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        lstCVarVehicleAction.Add(ObjCVarVehicleAction);
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
            lstCVarVehicleAction.Clear();

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
                Com.CommandText = "[dbo].GetListPagingVehicleAction";
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
                        CVarVehicleAction ObjCVarVehicleAction = new CVarVehicleAction();
                        ObjCVarVehicleAction.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVehicleAction.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarVehicleAction.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarVehicleAction.mVehicleActionID = Convert.ToInt32(dr["VehicleActionID"].ToString());
                        ObjCVarVehicleAction.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarVehicleAction.mInspectionNotes = Convert.ToString(dr["InspectionNotes"].ToString());
                        ObjCVarVehicleAction.mRowLocationID = Convert.ToInt32(dr["RowLocationID"].ToString());
                        ObjCVarVehicleAction.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarVehicleAction.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarVehicleAction.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarVehicleAction.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarVehicleAction.mFromWarehouseID = Convert.ToInt32(dr["FromWarehouseID"].ToString());
                        ObjCVarVehicleAction.mToWarehouseID = Convert.ToInt32(dr["ToWarehouseID"].ToString());
                        ObjCVarVehicleAction.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarVehicleAction.mLine = Convert.ToInt32(dr["Line"].ToString());
                        ObjCVarVehicleAction.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarVehicleAction.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarVehicleAction.Add(ObjCVarVehicleAction);
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
                    Com.CommandText = "[dbo].DeleteListVehicleAction";
                else
                    Com.CommandText = "[dbo].UpdateListVehicleAction";
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
        public Exception DeleteItem(List<CPKVehicleAction> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemVehicleAction";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKVehicleAction ObjCPKVehicleAction in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKVehicleAction.ID);
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
        public Exception SaveMethod(List<CVarVehicleAction> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ReceiveDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VehicleActionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@InspectionNotes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RowLocationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FromWarehouseID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToWarehouseID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Line", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsCancelled", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarVehicleAction ObjCVarVehicleAction in SaveList)
                {
                    if (ObjCVarVehicleAction.mIsChanges == true)
                    {
                        if (ObjCVarVehicleAction.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemVehicleAction";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarVehicleAction.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemVehicleAction";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarVehicleAction.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarVehicleAction.ID;
                        }
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarVehicleAction.OperationVehicleID;
                        Com.Parameters["@ReceiveDetailsID"].Value = ObjCVarVehicleAction.ReceiveDetailsID;
                        Com.Parameters["@VehicleActionID"].Value = ObjCVarVehicleAction.VehicleActionID;
                        Com.Parameters["@ActionDate"].Value = ObjCVarVehicleAction.ActionDate;
                        Com.Parameters["@InspectionNotes"].Value = ObjCVarVehicleAction.InspectionNotes;
                        Com.Parameters["@RowLocationID"].Value = ObjCVarVehicleAction.RowLocationID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarVehicleAction.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarVehicleAction.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarVehicleAction.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarVehicleAction.ModificationDate;
                        Com.Parameters["@FromWarehouseID"].Value = ObjCVarVehicleAction.FromWarehouseID;
                        Com.Parameters["@ToWarehouseID"].Value = ObjCVarVehicleAction.ToWarehouseID;
                        Com.Parameters["@CodeSerial"].Value = ObjCVarVehicleAction.CodeSerial;
                        Com.Parameters["@Line"].Value = ObjCVarVehicleAction.Line;
                        Com.Parameters["@IsCancelled"].Value = ObjCVarVehicleAction.IsCancelled;
                        Com.Parameters["@TruckerID"].Value = ObjCVarVehicleAction.TruckerID;
                        EndTrans(Com, Con);
                        if (ObjCVarVehicleAction.ID == 0)
                        {
                            ObjCVarVehicleAction.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarVehicleAction.mIsChanges = false;
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
