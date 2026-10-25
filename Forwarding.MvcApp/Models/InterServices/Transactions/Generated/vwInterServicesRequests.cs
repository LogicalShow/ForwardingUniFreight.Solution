using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.InterServices.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwInterServicesRequests
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Decimal mCost;
        internal Decimal mSalePrice;
        internal String mNotes;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal String mHBL;
        internal Int32 mStatusID;
        internal String mStatusName;
        internal Int32 mFromDepartmentID;
        internal String mFromDepartmentName;
        internal Int32 mToDepartmentID;
        internal String mToDepartmentName;
        internal Int32 mCreatorUserID;
        internal String mCreatorUserName;
        internal Int32 mToUserID;
        internal String mToUserName;
        internal Int32 mToCompanyID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mCost = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mSalePrice = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String HBL
        {
            get { return mHBL; }
            set { mHBL = value; }
        }
        public Int32 StatusID
        {
            get { return mStatusID; }
            set { mStatusID = value; }
        }
        public String StatusName
        {
            get { return mStatusName; }
            set { mStatusName = value; }
        }
        public Int32 FromDepartmentID
        {
            get { return mFromDepartmentID; }
            set { mFromDepartmentID = value; }
        }
        public String FromDepartmentName
        {
            get { return mFromDepartmentName; }
            set { mFromDepartmentName = value; }
        }
        public Int32 ToDepartmentID
        {
            get { return mToDepartmentID; }
            set { mToDepartmentID = value; }
        }
        public String ToDepartmentName
        {
            get { return mToDepartmentName; }
            set { mToDepartmentName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorUserName
        {
            get { return mCreatorUserName; }
            set { mCreatorUserName = value; }
        }
        public Int32 ToUserID
        {
            get { return mToUserID; }
            set { mToUserID = value; }
        }
        public String ToUserName
        {
            get { return mToUserName; }
            set { mToUserName = value; }
        }
        public Int32 ToCompanyID
        {
            get { return mToCompanyID; }
            set { mToCompanyID = value; }
        }
        #endregion
    }

    public partial class CvwInterServicesRequests
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
        public List<CVarvwInterServicesRequests> lstCVarvwInterServicesRequests = new List<CVarvwInterServicesRequests>();
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
            lstCVarvwInterServicesRequests.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwInterServicesRequests";
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
                        CVarvwInterServicesRequests ObjCVarvwInterServicesRequests = new CVarvwInterServicesRequests();
                        ObjCVarvwInterServicesRequests.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInterServicesRequests.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwInterServicesRequests.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwInterServicesRequests.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwInterServicesRequests.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwInterServicesRequests.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwInterServicesRequests.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInterServicesRequests.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInterServicesRequests.mHBL = Convert.ToString(dr["HBL"].ToString());
                        ObjCVarvwInterServicesRequests.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarvwInterServicesRequests.mStatusName = Convert.ToString(dr["StatusName"].ToString());
                        ObjCVarvwInterServicesRequests.mFromDepartmentID = Convert.ToInt32(dr["FromDepartmentID"].ToString());
                        ObjCVarvwInterServicesRequests.mFromDepartmentName = Convert.ToString(dr["FromDepartmentName"].ToString());
                        ObjCVarvwInterServicesRequests.mToDepartmentID = Convert.ToInt32(dr["ToDepartmentID"].ToString());
                        ObjCVarvwInterServicesRequests.mToDepartmentName = Convert.ToString(dr["ToDepartmentName"].ToString());
                        ObjCVarvwInterServicesRequests.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInterServicesRequests.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwInterServicesRequests.mToUserID = Convert.ToInt32(dr["ToUserID"].ToString());
                        ObjCVarvwInterServicesRequests.mToUserName = Convert.ToString(dr["ToUserName"].ToString());
                        ObjCVarvwInterServicesRequests.mToCompanyID = Convert.ToInt32(dr["ToCompanyID"].ToString());
                        lstCVarvwInterServicesRequests.Add(ObjCVarvwInterServicesRequests);
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
            lstCVarvwInterServicesRequests.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwInterServicesRequests";
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
                        CVarvwInterServicesRequests ObjCVarvwInterServicesRequests = new CVarvwInterServicesRequests();
                        ObjCVarvwInterServicesRequests.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInterServicesRequests.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwInterServicesRequests.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwInterServicesRequests.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwInterServicesRequests.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwInterServicesRequests.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwInterServicesRequests.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwInterServicesRequests.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwInterServicesRequests.mHBL = Convert.ToString(dr["HBL"].ToString());
                        ObjCVarvwInterServicesRequests.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarvwInterServicesRequests.mStatusName = Convert.ToString(dr["StatusName"].ToString());
                        ObjCVarvwInterServicesRequests.mFromDepartmentID = Convert.ToInt32(dr["FromDepartmentID"].ToString());
                        ObjCVarvwInterServicesRequests.mFromDepartmentName = Convert.ToString(dr["FromDepartmentName"].ToString());
                        ObjCVarvwInterServicesRequests.mToDepartmentID = Convert.ToInt32(dr["ToDepartmentID"].ToString());
                        ObjCVarvwInterServicesRequests.mToDepartmentName = Convert.ToString(dr["ToDepartmentName"].ToString());
                        ObjCVarvwInterServicesRequests.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwInterServicesRequests.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwInterServicesRequests.mToUserID = Convert.ToInt32(dr["ToUserID"].ToString());
                        ObjCVarvwInterServicesRequests.mToUserName = Convert.ToString(dr["ToUserName"].ToString());
                        ObjCVarvwInterServicesRequests.mToCompanyID = Convert.ToInt32(dr["ToCompanyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwInterServicesRequests.Add(ObjCVarvwInterServicesRequests);
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
