using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwVehicleAction
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
    public partial class CVarvwVehicleAction : CPKvwVehicleAction
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationVehicleID;
        internal Int64 mPurchaseItemID;
        internal String mPurchaseItemCode;
        internal String mPurchaseItemName;
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
        internal String mChassisNumber;
        internal String mMotorNumber;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int32 mOperationCodeSerial;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int64 mReceiveDetailsID;
        internal Int32 mVehicleActionID;
        internal String mVehicleActionName;
        internal DateTime mActionDate;
        internal String mInspectionNotes;
        internal Int32 mRowLocationID;
        internal Int32 mFromWarehouseID;
        internal String mFromWarehouseCode;
        internal String mFromWarehouseName;
        internal Int32 mToWarehouseID;
        internal String mToWarehouseCode;
        internal String mToWarehouseName;
        internal Int64 mCodeSerial;
        internal Int32 mLine;
        internal Boolean mIsCancelled;
        internal String mDispatchNumber;
        internal Int32 mTruckerID;
        internal String mTruckerName;
        #endregion

        #region "Methods"
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mOperationVehicleID = value; }
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
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mChassisNumber = value; }
        }
        public String MotorNumber
        {
            get { return mMotorNumber; }
            set { mMotorNumber = value; }
        }
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
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
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
        public Int64 ReceiveDetailsID
        {
            get { return mReceiveDetailsID; }
            set { mReceiveDetailsID = value; }
        }
        public Int32 VehicleActionID
        {
            get { return mVehicleActionID; }
            set { mVehicleActionID = value; }
        }
        public String VehicleActionName
        {
            get { return mVehicleActionName; }
            set { mVehicleActionName = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mActionDate = value; }
        }
        public String InspectionNotes
        {
            get { return mInspectionNotes; }
            set { mInspectionNotes = value; }
        }
        public Int32 RowLocationID
        {
            get { return mRowLocationID; }
            set { mRowLocationID = value; }
        }
        public Int32 FromWarehouseID
        {
            get { return mFromWarehouseID; }
            set { mFromWarehouseID = value; }
        }
        public String FromWarehouseCode
        {
            get { return mFromWarehouseCode; }
            set { mFromWarehouseCode = value; }
        }
        public String FromWarehouseName
        {
            get { return mFromWarehouseName; }
            set { mFromWarehouseName = value; }
        }
        public Int32 ToWarehouseID
        {
            get { return mToWarehouseID; }
            set { mToWarehouseID = value; }
        }
        public String ToWarehouseCode
        {
            get { return mToWarehouseCode; }
            set { mToWarehouseCode = value; }
        }
        public String ToWarehouseName
        {
            get { return mToWarehouseName; }
            set { mToWarehouseName = value; }
        }
        public Int64 CodeSerial
        {
            get { return mCodeSerial; }
            set { mCodeSerial = value; }
        }
        public Int32 Line
        {
            get { return mLine; }
            set { mLine = value; }
        }
        public Boolean IsCancelled
        {
            get { return mIsCancelled; }
            set { mIsCancelled = value; }
        }
        public String DispatchNumber
        {
            get { return mDispatchNumber; }
            set { mDispatchNumber = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mTruckerID = value; }
        }
        public String TruckerName
        {
            get { return mTruckerName; }
            set { mTruckerName = value; }
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

    public partial class CvwVehicleAction
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
        public List<CVarvwVehicleAction> lstCVarvwVehicleAction = new List<CVarvwVehicleAction>();
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
            lstCVarvwVehicleAction.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwVehicleAction";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                //Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwVehicleAction ObjCVarvwVehicleAction = new CVarvwVehicleAction();
                        ObjCVarvwVehicleAction.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwVehicleAction.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwVehicleAction.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarvwVehicleAction.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwVehicleAction.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarvwVehicleAction.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarvwVehicleAction.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwVehicleAction.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarvwVehicleAction.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarvwVehicleAction.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarvwVehicleAction.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarvwVehicleAction.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwVehicleAction.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwVehicleAction.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwVehicleAction.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwVehicleAction.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwVehicleAction.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwVehicleAction.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwVehicleAction.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwVehicleAction.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwVehicleAction.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwVehicleAction.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwVehicleAction.mVehicleActionID = Convert.ToInt32(dr["VehicleActionID"].ToString());
                        ObjCVarvwVehicleAction.mVehicleActionName = Convert.ToString(dr["VehicleActionName"].ToString());
                        ObjCVarvwVehicleAction.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarvwVehicleAction.mInspectionNotes = Convert.ToString(dr["InspectionNotes"].ToString());
                        ObjCVarvwVehicleAction.mRowLocationID = Convert.ToInt32(dr["RowLocationID"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseID = Convert.ToInt32(dr["FromWarehouseID"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseCode = Convert.ToString(dr["FromWarehouseCode"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseName = Convert.ToString(dr["FromWarehouseName"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseID = Convert.ToInt32(dr["ToWarehouseID"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseCode = Convert.ToString(dr["ToWarehouseCode"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseName = Convert.ToString(dr["ToWarehouseName"].ToString());
                        ObjCVarvwVehicleAction.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarvwVehicleAction.mLine = Convert.ToInt32(dr["Line"].ToString());
                        ObjCVarvwVehicleAction.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarvwVehicleAction.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwVehicleAction.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwVehicleAction.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        lstCVarvwVehicleAction.Add(ObjCVarvwVehicleAction);
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
            lstCVarvwVehicleAction.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwVehicleAction";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                //Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwVehicleAction ObjCVarvwVehicleAction = new CVarvwVehicleAction();
                        ObjCVarvwVehicleAction.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwVehicleAction.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarvwVehicleAction.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwVehicleAction.mOCNCode = Convert.ToString(dr["OCNCode"].ToString());
                        ObjCVarvwVehicleAction.mModel = Convert.ToString(dr["Model"].ToString());
                        ObjCVarvwVehicleAction.mKeyNumber = Convert.ToString(dr["KeyNumber"].ToString());
                        ObjCVarvwVehicleAction.mEC = Convert.ToString(dr["EC"].ToString());
                        ObjCVarvwVehicleAction.mPaintType = Convert.ToString(dr["PaintType"].ToString());
                        ObjCVarvwVehicleAction.mIC = Convert.ToString(dr["IC"].ToString());
                        ObjCVarvwVehicleAction.mCommercialInvoiceNumber = Convert.ToString(dr["CommercialInvoiceNumber"].ToString());
                        ObjCVarvwVehicleAction.mInsurancePolicyNumber = Convert.ToString(dr["InsurancePolicyNumber"].ToString());
                        ObjCVarvwVehicleAction.mProductionOrder = Convert.ToString(dr["ProductionOrder"].ToString());
                        ObjCVarvwVehicleAction.mPINumber = Convert.ToString(dr["PINumber"].ToString());
                        ObjCVarvwVehicleAction.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwVehicleAction.mEngineNumber = Convert.ToString(dr["EngineNumber"].ToString());
                        ObjCVarvwVehicleAction.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarvwVehicleAction.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarvwVehicleAction.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwVehicleAction.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwVehicleAction.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwVehicleAction.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwVehicleAction.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwVehicleAction.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
                        ObjCVarvwVehicleAction.mVehicleActionID = Convert.ToInt32(dr["VehicleActionID"].ToString());
                        ObjCVarvwVehicleAction.mVehicleActionName = Convert.ToString(dr["VehicleActionName"].ToString());
                        ObjCVarvwVehicleAction.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarvwVehicleAction.mInspectionNotes = Convert.ToString(dr["InspectionNotes"].ToString());
                        ObjCVarvwVehicleAction.mRowLocationID = Convert.ToInt32(dr["RowLocationID"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseID = Convert.ToInt32(dr["FromWarehouseID"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseCode = Convert.ToString(dr["FromWarehouseCode"].ToString());
                        ObjCVarvwVehicleAction.mFromWarehouseName = Convert.ToString(dr["FromWarehouseName"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseID = Convert.ToInt32(dr["ToWarehouseID"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseCode = Convert.ToString(dr["ToWarehouseCode"].ToString());
                        ObjCVarvwVehicleAction.mToWarehouseName = Convert.ToString(dr["ToWarehouseName"].ToString());
                        ObjCVarvwVehicleAction.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarvwVehicleAction.mLine = Convert.ToInt32(dr["Line"].ToString());
                        ObjCVarvwVehicleAction.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarvwVehicleAction.mDispatchNumber = Convert.ToString(dr["DispatchNumber"].ToString());
                        ObjCVarvwVehicleAction.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarvwVehicleAction.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwVehicleAction.Add(ObjCVarvwVehicleAction);
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
