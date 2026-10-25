using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public partial class CVarvwOperationsToRestoreInvoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mBLType;
        internal Int32 mShipmentType;
        internal String mMasterBL;
        internal String mHouseNumber;
        internal Int32 mOperationStageID;
        internal String mEffectiveOperationCode;
        internal Int64 mEffectiveOperationID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
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
        public String EffectiveOperationCode
        {
            get { return mEffectiveOperationCode; }
            set { mEffectiveOperationCode = value; }
        }
        public Int64 EffectiveOperationID
        {
            get { return mEffectiveOperationID; }
            set { mEffectiveOperationID = value; }
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
        #endregion
    }

    public partial class CvwOperationsToRestoreInvoices
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
        public List<CVarvwOperationsToRestoreInvoices> lstCVarvwOperationsToRestoreInvoices = new List<CVarvwOperationsToRestoreInvoices>();
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
            lstCVarvwOperationsToRestoreInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationsToRestoreInvoices";
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
                        CVarvwOperationsToRestoreInvoices ObjCVarvwOperationsToRestoreInvoices = new CVarvwOperationsToRestoreInvoices();
                        ObjCVarvwOperationsToRestoreInvoices.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mEffectiveOperationCode = Convert.ToString(dr["EffectiveOperationCode"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mEffectiveOperationID = Convert.ToInt64(dr["EffectiveOperationID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarvwOperationsToRestoreInvoices.Add(ObjCVarvwOperationsToRestoreInvoices);
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
            lstCVarvwOperationsToRestoreInvoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationsToRestoreInvoices";
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
                        CVarvwOperationsToRestoreInvoices ObjCVarvwOperationsToRestoreInvoices = new CVarvwOperationsToRestoreInvoices();
                        ObjCVarvwOperationsToRestoreInvoices.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mOperationStageID = Convert.ToInt32(dr["OperationStageID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mEffectiveOperationCode = Convert.ToString(dr["EffectiveOperationCode"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mEffectiveOperationID = Convert.ToInt64(dr["EffectiveOperationID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsToRestoreInvoices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationsToRestoreInvoices.Add(ObjCVarvwOperationsToRestoreInvoices);
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
