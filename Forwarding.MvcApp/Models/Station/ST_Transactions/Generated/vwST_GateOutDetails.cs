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
    public class CPKvwST_GateOutDetails
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
    public partial class CVarvwST_GateOutDetails : CPKvwST_GateOutDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mST_GateOutID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int64 mOperationID;
        internal Int64 mST_PreGateInDetailsID;
        internal Boolean misGateOut;
        internal Int64 mST_PreGateInID;
        internal String mOperationCode;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        #endregion

        #region "Methods"
        public Int32 ST_GateOutID
        {
            get { return mST_GateOutID; }
            set { mST_GateOutID = value; }
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
        public Boolean isGateOut
        {
            get { return misGateOut; }
            set { misGateOut = value; }
        }
        public Int64 ST_PreGateInID
        {
            get { return mST_PreGateInID; }
            set { mST_PreGateInID = value; }
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

    public partial class CvwST_GateOutDetails
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
        public List<CVarvwST_GateOutDetails> lstCVarvwST_GateOutDetails = new List<CVarvwST_GateOutDetails>();
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
            lstCVarvwST_GateOutDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwST_GateOutDetails";
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
                        CVarvwST_GateOutDetails ObjCVarvwST_GateOutDetails = new CVarvwST_GateOutDetails();
                        ObjCVarvwST_GateOutDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_GateOutID = Convert.ToInt32(dr["ST_GateOutID"].ToString());
                        ObjCVarvwST_GateOutDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_GateOutDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_GateOutDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwST_GateOutDetails.misGateOut = Convert.ToBoolean(dr["isGateOut"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwST_GateOutDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_GateOutDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_GateOutDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        lstCVarvwST_GateOutDetails.Add(ObjCVarvwST_GateOutDetails);
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
            lstCVarvwST_GateOutDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwST_GateOutDetails";
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
                        CVarvwST_GateOutDetails ObjCVarvwST_GateOutDetails = new CVarvwST_GateOutDetails();
                        ObjCVarvwST_GateOutDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_GateOutID = Convert.ToInt32(dr["ST_GateOutID"].ToString());
                        ObjCVarvwST_GateOutDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_GateOutDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_GateOutDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_PreGateInDetailsID = Convert.ToInt64(dr["ST_PreGateInDetailsID"].ToString());
                        ObjCVarvwST_GateOutDetails.misGateOut = Convert.ToBoolean(dr["isGateOut"].ToString());
                        ObjCVarvwST_GateOutDetails.mST_PreGateInID = Convert.ToInt64(dr["ST_PreGateInID"].ToString());
                        ObjCVarvwST_GateOutDetails.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_GateOutDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_GateOutDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwST_GateOutDetails.Add(ObjCVarvwST_GateOutDetails);
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
