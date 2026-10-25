using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwOperationVehicle
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
    public partial class CVarvwOperationVehicle : CPKvwOperationVehicle
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal String mDispatchNumber;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mAgentID;
        internal String mAgentName;
        internal String mCode;
        internal Int32 mEquipmentModelID;
        internal String mMotorNumber;
        internal String mChassisNumber;
        internal String mLotNumber;
        internal String mSerialNumber;
        internal Int64 mPurchaseItemID;
        internal String mPurchaseItemCode;
        internal String mPurchaseItemName;
        internal String mNotes;
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
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLastToWarehouseID;
        internal Int32 mLastTruckerID;
        internal Int32 mIsSentToWarehouse;
        internal Int32 mIsReceived;
        internal Int32 mIsPicked;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String DispatchNumber
        {
            get { return mDispatchNumber; }
            set { mDispatchNumber = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mAgentID = value; }
        }
        public String AgentName
        {
            get { return mAgentName; }
            set { mAgentName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 EquipmentModelID
        {
            get { return mEquipmentModelID; }
            set { mEquipmentModelID = value; }
        }
        public String MotorNumber
        {
            get { return mMotorNumber; }
            set { mMotorNumber = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mChassisNumber = value; }
        }
        public String LotNumber
        {
            get { return mLotNumber; }
            set { mLotNumber = value; }
        }
        public String SerialNumber
        {
            get { return mSerialNumber; }
            set { mSerialNumber = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public String PurchaseItemCode
        {
            get { return mPurchaseItemCode; }
            set { mPurchaseItemCode = value; }
        }
        public String PurchaseItemName
        {
            get { return mPurchaseItemName; }
            set { mPurchaseItemName = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String OCNCode
        {
            get { return mOCNCode; }
            set { mOCNCode = value; }
        }
        public String Model
        {
            get { return mModel; }
            set { mModel = value; }
        }
        public String KeyNumber
        {
            get { return mKeyNumber; }
            set { mKeyNumber = value; }
        }
        public String EC
        {
            get { return mEC; }
            set { mEC = value; }
        }
        public String PaintType
        {
            get { return mPaintType; }
            set { mPaintType = value; }
        }
        public String IC
        {
            get { return mIC; }
            set { mIC = value; }
        }
        public String CommercialInvoiceNumber
        {
            get { return mCommercialInvoiceNumber; }
            set { mCommercialInvoiceNumber = value; }
        }
        public String InsurancePolicyNumber
        {
            get { return mInsurancePolicyNumber; }
            set { mInsurancePolicyNumber = value; }
        }
        public String ProductionOrder
        {
            get { return mProductionOrder; }
            set { mProductionOrder = value; }
        }
        public String PINumber
        {
            get { return mPINumber; }
            set { mPINumber = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mBillNumber = value; }
        }
        public String EngineNumber
        {
            get { return mEngineNumber; }
            set { mEngineNumber = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 LastToWarehouseID
        {
            get { return mLastToWarehouseID; }
            set { mLastToWarehouseID = value; }
        }
        public Int32 LastTruckerID
        {
            get { return mLastTruckerID; }
            set { mLastTruckerID = value; }
        }
        public Int32 IsSentToWarehouse
        {
            get { return mIsSentToWarehouse; }
            set { mIsSentToWarehouse = value; }
        }
        public Int32 IsReceived
        {
            get { return mIsReceived; }
            set { mIsReceived = value; }
        }
        public Int32 IsPicked
        {
            get { return mIsPicked; }
            set { mIsPicked = value; }
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

    public partial class CvwOperationVehicle
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
        public List<CVarvwOperationVehicle> lstCVarvwOperationVehicle = new List<CVarvwOperationVehicle>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwOperationVehicle.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationVehicle";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwOperationVehicle ObjCVarvwOperationVehicle = new CVarvwOperationVehicle();
                        ObjCVarvwOperationVehicle.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationVehicle.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationVehicle.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwOperationVehicle.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwOperationVehicle.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwOperationVehicle.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwOperationVehicle.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperationVehicle.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwOperationVehicle.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationVehicle.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwOperationVehicle.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwOperationVehicle.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwOperationVehicle.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarvwOperationVehicle.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwOperationVehicle.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperationVehicle.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarvwOperationVehicle.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwOperationVehicle.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarvwOperationVehicle.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarvwOperationVehicle.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwOperationVehicle.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarvwOperationVehicle.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarvwOperationVehicle.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarvwOperationVehicle.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarvwOperationVehicle.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwOperationVehicle.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwOperationVehicle.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwOperationVehicle.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationVehicle.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationVehicle.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationVehicle.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationVehicle.mLastToWarehouseID = Convert.ToInt32(dr["LastToWarehouseID"].ToString());
                        ObjCVarvwOperationVehicle.mLastTruckerID = Convert.ToInt32(dr["LastTruckerID"].ToString());
                        ObjCVarvwOperationVehicle.mIsSentToWarehouse = Convert.ToInt32(dr["IsSentToWarehouse"].ToString());
                        ObjCVarvwOperationVehicle.mIsReceived = Convert.ToInt32(dr["IsReceived"].ToString());
                        ObjCVarvwOperationVehicle.mIsPicked = Convert.ToInt32(dr["IsPicked"].ToString());
                        lstCVarvwOperationVehicle.Add(ObjCVarvwOperationVehicle);
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
            lstCVarvwOperationVehicle.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationVehicle";
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
                        CVarvwOperationVehicle ObjCVarvwOperationVehicle = new CVarvwOperationVehicle();
                        ObjCVarvwOperationVehicle.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationVehicle.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationVehicle.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwOperationVehicle.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwOperationVehicle.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwOperationVehicle.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwOperationVehicle.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperationVehicle.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwOperationVehicle.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationVehicle.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwOperationVehicle.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwOperationVehicle.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwOperationVehicle.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarvwOperationVehicle.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwOperationVehicle.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwOperationVehicle.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperationVehicle.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarvwOperationVehicle.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwOperationVehicle.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarvwOperationVehicle.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarvwOperationVehicle.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwOperationVehicle.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarvwOperationVehicle.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarvwOperationVehicle.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarvwOperationVehicle.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarvwOperationVehicle.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwOperationVehicle.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwOperationVehicle.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwOperationVehicle.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationVehicle.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationVehicle.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationVehicle.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationVehicle.mLastToWarehouseID = Convert.ToInt32(dr["LastToWarehouseID"].ToString());
                        ObjCVarvwOperationVehicle.mLastTruckerID = Convert.ToInt32(dr["LastTruckerID"].ToString());
                        ObjCVarvwOperationVehicle.mIsSentToWarehouse = Convert.ToInt32(dr["IsSentToWarehouse"].ToString());
                        ObjCVarvwOperationVehicle.mIsReceived = Convert.ToInt32(dr["IsReceived"].ToString());
                        ObjCVarvwOperationVehicle.mIsPicked = Convert.ToInt32(dr["IsPicked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationVehicle.Add(ObjCVarvwOperationVehicle);
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
    }
}
