using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
    [Serializable]
    public class CPKWH_PDI
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
    public partial class CVarWH_PDI : CPKWH_PDI
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal Int64 mCodeSerial;
        internal Int64 mReceiveDetailsID;
        internal Int64 mOperationVehicleID;
        internal Int64 mPurchaseItemID;
        internal Decimal mQuantity;
        internal DateTime mActionDate;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mNotes;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int64 CodeSerial
        {
            get { return mCodeSerial; }
            set { mIsChanges = true; mCodeSerial = value; }
        }
        public Int64 ReceiveDetailsID
        {
            get { return mReceiveDetailsID; }
            set { mIsChanges = true; mReceiveDetailsID = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mIsChanges = true; mPurchaseItemID = value; }
        }
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mIsChanges = true; mActionDate = value; }
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
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CWH_PDI
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
        public List<CVarWH_PDI> lstCVarWH_PDI = new List<CVarWH_PDI>();
        public List<CPKWH_PDI> lstDeletedCPKWH_PDI = new List<CPKWH_PDI>();
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
            lstCVarWH_PDI.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_PDI";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_PDI";
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
                        CVarWH_PDI ObjCVarWH_PDI = new CVarWH_PDI();
                        ObjCVarWH_PDI.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_PDI.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWH_PDI.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarWH_PDI.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarWH_PDI.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarWH_PDI.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWH_PDI.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarWH_PDI.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarWH_PDI.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_PDI.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_PDI.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_PDI.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWH_PDI.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarWH_PDI.Add(ObjCVarWH_PDI);
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
            lstCVarWH_PDI.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_PDI";
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
                        CVarWH_PDI ObjCVarWH_PDI = new CVarWH_PDI();
                        ObjCVarWH_PDI.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_PDI.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWH_PDI.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarWH_PDI.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarWH_PDI.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarWH_PDI.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWH_PDI.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarWH_PDI.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarWH_PDI.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_PDI.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_PDI.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_PDI.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWH_PDI.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_PDI.Add(ObjCVarWH_PDI);
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
                    Com.CommandText = "[dbo].DeleteListWH_PDI";
                else
                    Com.CommandText = "[dbo].UpdateListWH_PDI";
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
        public Exception DeleteItem(List<CPKWH_PDI> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_PDI";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKWH_PDI ObjCPKWH_PDI in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_PDI.ID);
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
        public Exception SaveMethod(List<CVarWH_PDI> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ReceiveDetailsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ActionDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_PDI ObjCVarWH_PDI in SaveList)
                {
                    if (ObjCVarWH_PDI.mIsChanges == true)
                    {
                        if (ObjCVarWH_PDI.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_PDI";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_PDI.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_PDI";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_PDI.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_PDI.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarWH_PDI.Code;
                        Com.Parameters["@CodeSerial"].Value = ObjCVarWH_PDI.CodeSerial;
                        Com.Parameters["@ReceiveDetailsID"].Value = ObjCVarWH_PDI.ReceiveDetailsID;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarWH_PDI.OperationVehicleID;
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_PDI.PurchaseItemID;
                        Com.Parameters["@Quantity"].Value = ObjCVarWH_PDI.Quantity;
                        Com.Parameters["@ActionDate"].Value = ObjCVarWH_PDI.ActionDate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_PDI.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarWH_PDI.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_PDI.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarWH_PDI.ModificationDate;
                        Com.Parameters["@Notes"].Value = ObjCVarWH_PDI.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_PDI.ID == 0)
                        {
                            ObjCVarWH_PDI.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_PDI.mIsChanges = false;
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
