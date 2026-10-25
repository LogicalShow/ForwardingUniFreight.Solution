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
    public class CPKTruckingOrderCargo
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
    public partial class CVarTruckingOrderCargo : CPKTruckingOrderCargo
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mRoutingID;
        internal Int64 mOperationID;
        internal Int64 mOperationVehicleID;
        internal Int64 mOperationsContainersAndPackagesID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Decimal mCargoGrossWeight;
        #endregion

        #region "Methods"
        public Int64 RoutingID
        {
            get { return mRoutingID; }
            set { mIsChanges = true; mRoutingID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 OperationsContainersAndPackagesID
        {
            get { return mOperationsContainersAndPackagesID; }
            set { mIsChanges = true; mOperationsContainersAndPackagesID = value; }
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
        public Decimal CargoGrossWeight
        {
            get { return mCargoGrossWeight; }
            set { mIsChanges = true; mCargoGrossWeight = value; }
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

    public partial class CTruckingOrderCargo
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
        public List<CVarTruckingOrderCargo> lstCVarTruckingOrderCargo = new List<CVarTruckingOrderCargo>();
        public List<CPKTruckingOrderCargo> lstDeletedCPKTruckingOrderCargo = new List<CPKTruckingOrderCargo>();
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
            lstCVarTruckingOrderCargo.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListTruckingOrderCargo";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemTruckingOrderCargo";
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
                        CVarTruckingOrderCargo ObjCVarTruckingOrderCargo = new CVarTruckingOrderCargo();
                        ObjCVarTruckingOrderCargo.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarTruckingOrderCargo.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationsContainersAndPackagesID = Convert.ToInt64(dr["OperationsContainersAndPackagesID"].ToString());
                        ObjCVarTruckingOrderCargo.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTruckingOrderCargo.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTruckingOrderCargo.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTruckingOrderCargo.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTruckingOrderCargo.mCargoGrossWeight = Convert.ToDecimal(dr["CargoGrossWeight"].ToString());
                        lstCVarTruckingOrderCargo.Add(ObjCVarTruckingOrderCargo);
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
            lstCVarTruckingOrderCargo.Clear();

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
                Com.CommandText = "[dbo].GetListPagingTruckingOrderCargo";
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
                        CVarTruckingOrderCargo ObjCVarTruckingOrderCargo = new CVarTruckingOrderCargo();
                        ObjCVarTruckingOrderCargo.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarTruckingOrderCargo.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarTruckingOrderCargo.mOperationsContainersAndPackagesID = Convert.ToInt64(dr["OperationsContainersAndPackagesID"].ToString());
                        ObjCVarTruckingOrderCargo.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTruckingOrderCargo.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTruckingOrderCargo.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTruckingOrderCargo.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTruckingOrderCargo.mCargoGrossWeight = Convert.ToDecimal(dr["CargoGrossWeight"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarTruckingOrderCargo.Add(ObjCVarTruckingOrderCargo);
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
                    Com.CommandText = "[dbo].DeleteListTruckingOrderCargo";
                else
                    Com.CommandText = "[dbo].UpdateListTruckingOrderCargo";
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
        public Exception DeleteItem(List<CPKTruckingOrderCargo> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemTruckingOrderCargo";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKTruckingOrderCargo ObjCPKTruckingOrderCargo in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKTruckingOrderCargo.ID);
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
        public Exception SaveMethod(List<CVarTruckingOrderCargo> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@RoutingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationsContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CargoGrossWeight", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarTruckingOrderCargo ObjCVarTruckingOrderCargo in SaveList)
                {
                    if (ObjCVarTruckingOrderCargo.mIsChanges == true)
                    {
                        if (ObjCVarTruckingOrderCargo.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemTruckingOrderCargo";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarTruckingOrderCargo.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemTruckingOrderCargo";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarTruckingOrderCargo.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarTruckingOrderCargo.ID;
                        }
                        Com.Parameters["@RoutingID"].Value = ObjCVarTruckingOrderCargo.RoutingID;
                        Com.Parameters["@OperationID"].Value = ObjCVarTruckingOrderCargo.OperationID;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarTruckingOrderCargo.OperationVehicleID;
                        Com.Parameters["@OperationsContainersAndPackagesID"].Value = ObjCVarTruckingOrderCargo.OperationsContainersAndPackagesID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarTruckingOrderCargo.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarTruckingOrderCargo.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarTruckingOrderCargo.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarTruckingOrderCargo.ModificationDate;
                        Com.Parameters["@CargoGrossWeight"].Value = ObjCVarTruckingOrderCargo.CargoGrossWeight;
                        EndTrans(Com, Con);
                        if (ObjCVarTruckingOrderCargo.ID == 0)
                        {
                            ObjCVarTruckingOrderCargo.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarTruckingOrderCargo.mIsChanges = false;
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
