using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKvwGetST_PreGateInDetailsForGateIn
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
    public partial class CVarvwGetST_PreGateInDetailsForGateIn : CPKvwGetST_PreGateInDetailsForGateIn
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mST_PreGateInID;
        internal DateTime mEntryDate;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal Int64 mST_PreGateInDetailsID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int32 mPackageTypeIDOnContainer;
        internal String mDriver;
        internal String mTruckNumber;
        internal String mPO;
        internal Int64 mPreGateInID;
        internal Boolean misComplete;
        internal Int32 misGateIn;
        internal String mOperationCode;
        internal String mCustomerName;
        #endregion

        #region "Methods"
        public Int64 ST_PreGateInID
        {
            get { return mST_PreGateInID; }
            set { mST_PreGateInID = value; }
        }
        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mEntryDate = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Int64 ST_PreGateInDetailsID
        {
            get { return mST_PreGateInDetailsID; }
            set { mST_PreGateInDetailsID = value; }
        }
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public Int32 PackageTypeIDOnContainer
        {
            get { return mPackageTypeIDOnContainer; }
            set { mPackageTypeIDOnContainer = value; }
        }
        public String Driver
        {
            get { return mDriver; }
            set { mDriver = value; }
        }
        public String TruckNumber
        {
            get { return mTruckNumber; }
            set { mTruckNumber = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
        public Int64 PreGateInID
        {
            get { return mPreGateInID; }
            set { mPreGateInID = value; }
        }
        public Boolean isComplete
        {
            get { return misComplete; }
            set { misComplete = value; }
        }
        public Int32 isGateIn
        {
            get { return misGateIn; }
            set { misGateIn = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
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

    public partial class CvwGetST_PreGateInDetailsForGateIn
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
        public List<CVarvwGetST_PreGateInDetailsForGateIn> lstCVarvwGetST_PreGateInDetailsForGateIn = new List<CVarvwGetST_PreGateInDetailsForGateIn>();
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
            lstCVarvwGetST_PreGateInDetailsForGateIn.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwGetST_PreGateInDetailsForGateIn";
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
                        CVarvwGetST_PreGateInDetailsForGateIn ObjCVarvwGetST_PreGateInDetailsForGateIn = new CVarvwGetST_PreGateInDetailsForGateIn();
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.misGateIn = Convert.ToInt32(dr["isGateIn"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        lstCVarvwGetST_PreGateInDetailsForGateIn.Add(ObjCVarvwGetST_PreGateInDetailsForGateIn);
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
            lstCVarvwGetST_PreGateInDetailsForGateIn.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwGetST_PreGateInDetailsForGateIn";
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
                        CVarvwGetST_PreGateInDetailsForGateIn ObjCVarvwGetST_PreGateInDetailsForGateIn = new CVarvwGetST_PreGateInDetailsForGateIn();
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.misGateIn = Convert.ToInt32(dr["isGateIn"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwGetST_PreGateInDetailsForGateIn.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwGetST_PreGateInDetailsForGateIn.Add(ObjCVarvwGetST_PreGateInDetailsForGateIn);
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
