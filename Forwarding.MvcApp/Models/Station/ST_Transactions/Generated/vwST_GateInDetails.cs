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
    public class CPKvwST_GateInDetails
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwST_GateInDetails : CPKvwST_GateInDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mST_GateInID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int64 mOperationID;
        internal Int64 mST_PreGateInDetailsID;
        internal Boolean misGateIn;
        internal Int64 mST_PreGateInID;
        internal String mPO;
        internal String mOperationCode;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        #endregion

        #region "Methods"
        public Int32 ST_GateInID
        {
            get { return mST_GateInID; }
            set { mST_GateInID = value; }
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
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 ST_PreGateInDetailsID
        {
            get { return mST_PreGateInDetailsID; }
            set { mST_PreGateInDetailsID = value; }
        }
        public Boolean isGateIn
        {
            get { return misGateIn; }
            set { misGateIn = value; }
        }
        public Int64 ST_PreGateInID
        {
            get { return mST_PreGateInID; }
            set { mST_PreGateInID = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
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

    public partial class CvwST_GateInDetails
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
        public List<CVarvwST_GateInDetails> lstCVarvwST_GateInDetails = new List<CVarvwST_GateInDetails>();
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
            lstCVarvwST_GateInDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwST_GateInDetails";
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
                        CVarvwST_GateInDetails ObjCVarvwST_GateInDetails = new CVarvwST_GateInDetails();
                        ObjCVarvwST_GateInDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwST_GateInDetails.mST_GateInID = Convert.ToInt32(dr["ST_GateInID"].ToString());
                        ObjCVarvwST_GateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_GateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_GateInDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_GateInDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwST_GateInDetails.misGateIn = Convert.ToBoolean(dr["isGateIn"].ToString());
                        ObjCVarvwST_GateInDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwST_GateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwST_GateInDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_GateInDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_GateInDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        lstCVarvwST_GateInDetails.Add(ObjCVarvwST_GateInDetails);
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
            lstCVarvwST_GateInDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwST_GateInDetails";
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
                        CVarvwST_GateInDetails ObjCVarvwST_GateInDetails = new CVarvwST_GateInDetails();
                        ObjCVarvwST_GateInDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwST_GateInDetails.mST_GateInID = Convert.ToInt32(dr["ST_GateInID"].ToString());
                        ObjCVarvwST_GateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_GateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_GateInDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_GateInDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwST_GateInDetails.misGateIn = Convert.ToBoolean(dr["isGateIn"].ToString());
                        ObjCVarvwST_GateInDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwST_GateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwST_GateInDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_GateInDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_GateInDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwST_GateInDetails.Add(ObjCVarvwST_GateInDetails);
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
