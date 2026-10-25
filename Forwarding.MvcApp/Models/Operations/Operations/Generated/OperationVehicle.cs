using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKOperationVehicle
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
    public partial class CVarOperationVehicle : CPKOperationVehicle
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal String mCode;
        internal Int32 mEquipmentModelID;
        internal Int64 mPurchaseItemID;
        internal String mMotorNumber;
        internal String mChassisNumber;
        internal String mLotNumber;
        internal String mSerialNumber;
        internal Boolean mIsSentToWarehouse;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mOCNCode;
        internal String mModel;
        internal String mKeyNumber;
        internal String mEC;
        internal String mPaintType;
        internal String mIC;
        internal String mCommercialInvoiceNumber;
        internal String mInsurancePolicyNumber;
        internal String mProductionOrder;
        internal String mPINumber;
        internal String mBillNumber;
        internal String mEngineNumber;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 EquipmentModelID
        {
            get { return mEquipmentModelID; }
            set { mIsChanges = true; mEquipmentModelID = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mIsChanges = true; mPurchaseItemID = value; }
        }
        public String MotorNumber
        {
            get { return mMotorNumber; }
            set { mIsChanges = true; mMotorNumber = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mIsChanges = true; mChassisNumber = value; }
        }
        public String LotNumber
        {
            get { return mLotNumber; }
            set { mIsChanges = true; mLotNumber = value; }
        }
        public String SerialNumber
        {
            get { return mSerialNumber; }
            set { mIsChanges = true; mSerialNumber = value; }
        }
        public Boolean IsSentToWarehouse
        {
            get { return mIsSentToWarehouse; }
            set { mIsChanges = true; mIsSentToWarehouse = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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
        public String OCNCode
        {
            get { return mOCNCode; }
            set { mIsChanges = true; mOCNCode = value; }
        }
        public String Model
        {
            get { return mModel; }
            set { mIsChanges = true; mModel = value; }
        }
        public String KeyNumber
        {
            get { return mKeyNumber; }
            set { mIsChanges = true; mKeyNumber = value; }
        }
        public String EC
        {
            get { return mEC; }
            set { mIsChanges = true; mEC = value; }
        }
        public String PaintType
        {
            get { return mPaintType; }
            set { mIsChanges = true; mPaintType = value; }
        }
        public String IC
        {
            get { return mIC; }
            set { mIsChanges = true; mIC = value; }
        }
        public String CommercialInvoiceNumber
        {
            get { return mCommercialInvoiceNumber; }
            set { mIsChanges = true; mCommercialInvoiceNumber = value; }
        }
        public String InsurancePolicyNumber
        {
            get { return mInsurancePolicyNumber; }
            set { mIsChanges = true; mInsurancePolicyNumber = value; }
        }
        public String ProductionOrder
        {
            get { return mProductionOrder; }
            set { mIsChanges = true; mProductionOrder = value; }
        }
        public String PINumber
        {
            get { return mPINumber; }
            set { mIsChanges = true; mPINumber = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mIsChanges = true; mBillNumber = value; }
        }
        public String EngineNumber
        {
            get { return mEngineNumber; }
            set { mIsChanges = true; mEngineNumber = value; }
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

    public partial class COperationVehicle
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
        public List<CVarOperationVehicle> lstCVarOperationVehicle = new List<CVarOperationVehicle>();
        public List<CPKOperationVehicle> lstDeletedCPKOperationVehicle = new List<CPKOperationVehicle>();
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
            lstCVarOperationVehicle.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListOperationVehicle";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperationVehicle";
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
                        CVarOperationVehicle ObjCVarOperationVehicle = new CVarOperationVehicle();
                        ObjCVarOperationVehicle.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationVehicle.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationVehicle.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarOperationVehicle.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarOperationVehicle.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarOperationVehicle.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarOperationVehicle.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarOperationVehicle.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarOperationVehicle.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarOperationVehicle.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        ObjCVarOperationVehicle.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperationVehicle.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationVehicle.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationVehicle.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationVehicle.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperationVehicle.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarOperationVehicle.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarOperationVehicle.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarOperationVehicle.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarOperationVehicle.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarOperationVehicle.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarOperationVehicle.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarOperationVehicle.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarOperationVehicle.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarOperationVehicle.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarOperationVehicle.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarOperationVehicle.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        lstCVarOperationVehicle.Add(ObjCVarOperationVehicle);
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
            lstCVarOperationVehicle.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperationVehicle";
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
                        CVarOperationVehicle ObjCVarOperationVehicle = new CVarOperationVehicle();
                        ObjCVarOperationVehicle.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationVehicle.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationVehicle.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarOperationVehicle.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarOperationVehicle.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarOperationVehicle.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarOperationVehicle.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarOperationVehicle.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarOperationVehicle.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarOperationVehicle.mIsSentToWarehouse = Convert.ToBoolean(dr["IsSentToWarehouse"].ToString());
                        ObjCVarOperationVehicle.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperationVehicle.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationVehicle.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationVehicle.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationVehicle.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarOperationVehicle.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarOperationVehicle.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarOperationVehicle.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarOperationVehicle.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarOperationVehicle.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarOperationVehicle.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarOperationVehicle.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarOperationVehicle.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarOperationVehicle.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarOperationVehicle.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarOperationVehicle.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarOperationVehicle.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperationVehicle.Add(ObjCVarOperationVehicle);
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
                    Com.CommandText = "[dbo].DeleteListOperationVehicle";
                else
                    Com.CommandText = "[dbo].UpdateListOperationVehicle";
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
        public Exception DeleteItem(List<CPKOperationVehicle> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperationVehicle";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKOperationVehicle ObjCPKOperationVehicle in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKOperationVehicle.ID);
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
        public Exception SaveMethod(List<CVarOperationVehicle> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EquipmentModelID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@MotorNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChassisNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LotNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SerialNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsSentToWarehouse", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OCNCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@KeyNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EC", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaintType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IC", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CommercialInvoiceNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@InsurancePolicyNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ProductionOrder", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PINumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BillNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EngineNumber", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperationVehicle ObjCVarOperationVehicle in SaveList)
                {
                    if (ObjCVarOperationVehicle.mIsChanges == true)
                    {
                        if (ObjCVarOperationVehicle.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperationVehicle";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperationVehicle.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperationVehicle";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperationVehicle.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperationVehicle.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarOperationVehicle.OperationID;
                        Com.Parameters["@Code"].Value = ObjCVarOperationVehicle.Code;
                        Com.Parameters["@EquipmentModelID"].Value = ObjCVarOperationVehicle.EquipmentModelID;
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarOperationVehicle.PurchaseItemID;
                        Com.Parameters["@MotorNumber"].Value = ObjCVarOperationVehicle.MotorNumber;
                        Com.Parameters["@ChassisNumber"].Value = ObjCVarOperationVehicle.ChassisNumber;
                        Com.Parameters["@LotNumber"].Value = ObjCVarOperationVehicle.LotNumber;
                        Com.Parameters["@SerialNumber"].Value = ObjCVarOperationVehicle.SerialNumber;
                        Com.Parameters["@IsSentToWarehouse"].Value = ObjCVarOperationVehicle.IsSentToWarehouse;
                        Com.Parameters["@Notes"].Value = ObjCVarOperationVehicle.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarOperationVehicle.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarOperationVehicle.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarOperationVehicle.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarOperationVehicle.ModificationDate;
                        Com.Parameters["@OCNCode"].Value = ObjCVarOperationVehicle.OCNCode;
                        Com.Parameters["@Model"].Value = ObjCVarOperationVehicle.Model;
                        Com.Parameters["@KeyNumber"].Value = ObjCVarOperationVehicle.KeyNumber;
                        Com.Parameters["@EC"].Value = ObjCVarOperationVehicle.EC;
                        Com.Parameters["@PaintType"].Value = ObjCVarOperationVehicle.PaintType;
                        Com.Parameters["@IC"].Value = ObjCVarOperationVehicle.IC;
                        Com.Parameters["@CommercialInvoiceNumber"].Value = ObjCVarOperationVehicle.CommercialInvoiceNumber;
                        Com.Parameters["@InsurancePolicyNumber"].Value = ObjCVarOperationVehicle.InsurancePolicyNumber;
                        Com.Parameters["@ProductionOrder"].Value = ObjCVarOperationVehicle.ProductionOrder;
                        Com.Parameters["@PINumber"].Value = ObjCVarOperationVehicle.PINumber;
                        Com.Parameters["@BillNumber"].Value = ObjCVarOperationVehicle.BillNumber;
                        Com.Parameters["@EngineNumber"].Value = ObjCVarOperationVehicle.EngineNumber;
                        EndTrans(Com, Con);
                        if (ObjCVarOperationVehicle.ID == 0)
                        {
                            ObjCVarOperationVehicle.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperationVehicle.mIsChanges = false;
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
