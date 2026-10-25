using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKvwOperations_Vouchers
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
    public partial class CVarvwOperations_Vouchers : CPKvwOperations_Vouchers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mBLType;
        internal Int32 mDirectionType;
        internal Int32 mTransportType;
        internal Int32 mShipmentType;
        internal Int32 mPOL;
        internal Int32 mPOD;
        internal DateTime mOpenDate;
        internal DateTime mCloseDate;
        internal String mCode;
        internal Int32 mCodeSerial;
        internal Int32 mBranchID;
        internal Int64 mMasterOperationID;
        internal Boolean mIsPackagesPlacedOnMaster;
        internal Int64 mQuotationRouteID;
        internal String mMasterBL;
        internal String mHouseNumber;
        internal Int32 mOperationStageID;
        internal DateTime mCreationDate;
        internal String mCertificateNumber;
        #endregion

        #region "Methods"
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public Int32 TransportType
        {
            get { return mTransportType; }
            set { mTransportType = value; }
        }
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
        }
        public Int32 POL
        {
            get { return mPOL; }
            set { mPOL = value; }
        }
        public Int32 POD
        {
            get { return mPOD; }
            set { mPOD = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mCodeSerial = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public Boolean IsPackagesPlacedOnMaster
        {
            get { return mIsPackagesPlacedOnMaster; }
            set { mIsPackagesPlacedOnMaster = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mQuotationRouteID = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public Int32 OperationStageID
        {
            get { return mOperationStageID; }
            set { mOperationStageID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public String CertificateNumber
        {
            get { return mCertificateNumber; }
            set { mCertificateNumber = value; }
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

    public partial class CvwOperations_Vouchers
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
        public List<CVarvwOperations_Vouchers> lstCVarvwOperations_Vouchers = new List<CVarvwOperations_Vouchers>();
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
            lstCVarvwOperations_Vouchers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperations_Vouchers";
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
                        CVarvwOperations_Vouchers ObjCVarvwOperations_Vouchers = new CVarvwOperations_Vouchers();
                        ObjCVarvwOperations_Vouchers.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperations_Vouchers.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperations_Vouchers.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperations_Vouchers.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperations_Vouchers.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperations_Vouchers.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwOperations_Vouchers.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwOperations_Vouchers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperations_Vouchers.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperations_Vouchers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwOperations_Vouchers.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperations_Vouchers.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
                        ObjCVarvwOperations_Vouchers.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwOperations_Vouchers.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperations_Vouchers.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperations_Vouchers.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwOperations_Vouchers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        lstCVarvwOperations_Vouchers.Add(ObjCVarvwOperations_Vouchers);
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
            lstCVarvwOperations_Vouchers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperations_Vouchers";
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
                        CVarvwOperations_Vouchers ObjCVarvwOperations_Vouchers = new CVarvwOperations_Vouchers();
                        ObjCVarvwOperations_Vouchers.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperations_Vouchers.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperations_Vouchers.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperations_Vouchers.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperations_Vouchers.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperations_Vouchers.mPOL = Convert.ToInt32(dr["POL"].ToString());
                        ObjCVarvwOperations_Vouchers.mPOD = Convert.ToInt32(dr["POD"].ToString());
                        ObjCVarvwOperations_Vouchers.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperations_Vouchers.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwOperations_Vouchers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwOperations_Vouchers.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperations_Vouchers.mIsPackagesPlacedOnMaster = Convert.ToBoolean(dr["IsPackagesPlacedOnMaster"].ToString());
                        ObjCVarvwOperations_Vouchers.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwOperations_Vouchers.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperations_Vouchers.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperations_Vouchers.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwOperations_Vouchers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperations_Vouchers.mCertificateNumber = Convert.ToString(dr["CertificateNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperations_Vouchers.Add(ObjCVarvwOperations_Vouchers);
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
