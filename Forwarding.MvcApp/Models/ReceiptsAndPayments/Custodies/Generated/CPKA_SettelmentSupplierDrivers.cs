using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated
{
    [Serializable]
    public class CPKA_SettelmentSupplierDrivers
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
    public partial class CVarA_SettelmentSupplierDrivers : CPKA_SettelmentSupplierDrivers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPaymentRequestDetailsID;
        internal Int64 mOperationID;
        internal Int32 mTruckingOrderID;
        internal Boolean mFilterChargeTypes;
        internal Int32 mChargeTypeID;
        internal Decimal mActualCost;
        internal String mDescription;
        internal Int64 mPayableID;
        internal Int32 mPartenerTypeID;
        internal Int32 mPartenerID;
        internal Int64 mjvid;
        internal Boolean mApproved;
        #endregion

        #region "Methods"
        public Int64 PaymentRequestDetailsID
        {
            get { return mPaymentRequestDetailsID; }
            set { mIsChanges = true; mPaymentRequestDetailsID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 TruckingOrderID
        {
            get { return mTruckingOrderID; }
            set { mIsChanges = true; mTruckingOrderID = value; }
        }
        public Boolean FilterChargeTypes
        {
            get { return mFilterChargeTypes; }
            set { mIsChanges = true; mFilterChargeTypes = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Decimal ActualCost
        {
            get { return mActualCost; }
            set { mIsChanges = true; mActualCost = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mIsChanges = true; mPayableID = value; }
        }
        public Int32 PartenerTypeID
        {
            get { return mPartenerTypeID; }
            set { mIsChanges = true; mPartenerTypeID = value; }
        }
        public Int32 PartenerID
        {
            get { return mPartenerID; }
            set { mIsChanges = true; mPartenerID = value; }
        }
        public Int64 jvid
        {
            get { return mjvid; }
            set { mIsChanges = true; mjvid = value; }
        }
        public Boolean Approved
        {
            get { return mApproved; }
            set { mIsChanges = true; mApproved = value; }
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

    public partial class CA_SettelmentSupplierDrivers
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
        public List<CVarA_SettelmentSupplierDrivers> lstCVarA_SettelmentSupplierDrivers = new List<CVarA_SettelmentSupplierDrivers>();
        public List<CPKA_SettelmentSupplierDrivers> lstDeletedCPKA_SettelmentSupplierDrivers = new List<CPKA_SettelmentSupplierDrivers>();
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
            lstCVarA_SettelmentSupplierDrivers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_SettelmentSupplierDrivers";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_SettelmentSupplierDrivers";
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
                        CVarA_SettelmentSupplierDrivers ObjCVarA_SettelmentSupplierDrivers = new CVarA_SettelmentSupplierDrivers();
                        ObjCVarA_SettelmentSupplierDrivers.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPaymentRequestDetailsID = Convert.ToInt64(dr["PaymentRequestDetailsID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mTruckingOrderID = Convert.ToInt32(dr["TruckingOrderID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mFilterChargeTypes = Convert.ToBoolean(dr["FilterChargeTypes"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mActualCost = Convert.ToDecimal(dr["ActualCost"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPartenerTypeID = Convert.ToInt32(dr["PartenerTypeID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPartenerID = Convert.ToInt32(dr["PartenerID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mjvid = Convert.ToInt64(dr["jvid"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        lstCVarA_SettelmentSupplierDrivers.Add(ObjCVarA_SettelmentSupplierDrivers);
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
            lstCVarA_SettelmentSupplierDrivers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_SettelmentSupplierDrivers";
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
                        CVarA_SettelmentSupplierDrivers ObjCVarA_SettelmentSupplierDrivers = new CVarA_SettelmentSupplierDrivers();
                        ObjCVarA_SettelmentSupplierDrivers.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPaymentRequestDetailsID = Convert.ToInt64(dr["PaymentRequestDetailsID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mTruckingOrderID = Convert.ToInt32(dr["TruckingOrderID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mFilterChargeTypes = Convert.ToBoolean(dr["FilterChargeTypes"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mActualCost = Convert.ToDecimal(dr["ActualCost"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPartenerTypeID = Convert.ToInt32(dr["PartenerTypeID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mPartenerID = Convert.ToInt32(dr["PartenerID"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mjvid = Convert.ToInt64(dr["jvid"].ToString());
                        ObjCVarA_SettelmentSupplierDrivers.mApproved = Convert.ToBoolean(dr["Approved"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_SettelmentSupplierDrivers.Add(ObjCVarA_SettelmentSupplierDrivers);
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
                    Com.CommandText = "[dbo].DeleteListA_SettelmentSupplierDrivers";
                else
                    Com.CommandText = "[dbo].UpdateListA_SettelmentSupplierDrivers";
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
        public Exception DeleteItem(List<CPKA_SettelmentSupplierDrivers> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_SettelmentSupplierDrivers";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_SettelmentSupplierDrivers ObjCPKA_SettelmentSupplierDrivers in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_SettelmentSupplierDrivers.ID);
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
        public Exception SaveMethod(List<CVarA_SettelmentSupplierDrivers> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PaymentRequestDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FilterChargeTypes", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActualCost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PayableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PartenerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartenerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@jvid", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_SettelmentSupplierDrivers ObjCVarA_SettelmentSupplierDrivers in SaveList)
                {
                    if (ObjCVarA_SettelmentSupplierDrivers.mIsChanges == true)
                    {
                        if (ObjCVarA_SettelmentSupplierDrivers.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_SettelmentSupplierDrivers";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_SettelmentSupplierDrivers.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_SettelmentSupplierDrivers";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_SettelmentSupplierDrivers.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_SettelmentSupplierDrivers.ID;
                        }
                        Com.Parameters["@PaymentRequestDetailsID"].Value = ObjCVarA_SettelmentSupplierDrivers.PaymentRequestDetailsID;
                        Com.Parameters["@OperationID"].Value = ObjCVarA_SettelmentSupplierDrivers.OperationID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarA_SettelmentSupplierDrivers.TruckingOrderID;
                        Com.Parameters["@FilterChargeTypes"].Value = ObjCVarA_SettelmentSupplierDrivers.FilterChargeTypes;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarA_SettelmentSupplierDrivers.ChargeTypeID;
                        Com.Parameters["@ActualCost"].Value = ObjCVarA_SettelmentSupplierDrivers.ActualCost;
                        Com.Parameters["@Description"].Value = ObjCVarA_SettelmentSupplierDrivers.Description;
                        Com.Parameters["@PayableID"].Value = ObjCVarA_SettelmentSupplierDrivers.PayableID;
                        Com.Parameters["@PartenerTypeID"].Value = ObjCVarA_SettelmentSupplierDrivers.PartenerTypeID;
                        Com.Parameters["@PartenerID"].Value = ObjCVarA_SettelmentSupplierDrivers.PartenerID;
                        Com.Parameters["@jvid"].Value = ObjCVarA_SettelmentSupplierDrivers.jvid;
                        Com.Parameters["@Approved"].Value = ObjCVarA_SettelmentSupplierDrivers.Approved;
                        EndTrans(Com, Con);
                        if (ObjCVarA_SettelmentSupplierDrivers.ID == 0)
                        {
                            ObjCVarA_SettelmentSupplierDrivers.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_SettelmentSupplierDrivers.mIsChanges = false;
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
