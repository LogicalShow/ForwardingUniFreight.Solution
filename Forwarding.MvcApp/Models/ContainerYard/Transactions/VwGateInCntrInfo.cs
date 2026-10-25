using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ContainerYard.Transactions
{
    [Serializable]
    public partial class CVarVwGateInCntrInfo
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mContainerNumber;
        internal DateTime mTransactionDate;
        internal String mCustomersName;
        internal String mWH_WarehouseName;
        internal Int32 mCustomerID;
        internal Int32 mWH_WarehouseID;
        internal Int32 mWH_CntrStockID;
        internal Boolean mIsHire;
        internal Boolean misOwn;
        internal Int32 mContainerTypesID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public String CustomersName
        {
            get { return mCustomersName; }
            set { mCustomersName = value; }
        }
        public String WH_WarehouseName
        {
            get { return mWH_WarehouseName; }
            set { mWH_WarehouseName = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Int32 WH_WarehouseID
        {
            get { return mWH_WarehouseID; }
            set { mWH_WarehouseID = value; }
        }
        public Int32 WH_CntrStockID
        {
            get { return mWH_CntrStockID; }
            set { mWH_CntrStockID = value; }
        }
        public Boolean IsHire
        {
            get { return mIsHire; }
            set { mIsHire = value; }
        }
        public Boolean isOwn
        {
            get { return misOwn; }
            set { misOwn = value; }
        }
        public Int32 ContainerTypesID
        {
            get { return mContainerTypesID; }
            set { mContainerTypesID = value; }
        }
        #endregion
    }

    public partial class CVwGateInCntrInfo
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
        public List<CVarVwGateInCntrInfo> lstCVarVwGateInCntrInfo = new List<CVarVwGateInCntrInfo>();
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
            lstCVarVwGateInCntrInfo.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListVwGateInCntrInfo";
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
                        CVarVwGateInCntrInfo ObjCVarVwGateInCntrInfo = new CVarVwGateInCntrInfo();
                        ObjCVarVwGateInCntrInfo.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVwGateInCntrInfo.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarVwGateInCntrInfo.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarVwGateInCntrInfo.mCustomersName = Convert.ToString(dr["CustomersName"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_WarehouseName = Convert.ToString(dr["WH_WarehouseName"].ToString());
                        ObjCVarVwGateInCntrInfo.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_WarehouseID = Convert.ToInt32(dr["WH_WarehouseID"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_CntrStockID = Convert.ToInt32(dr["WH_CntrStockID"].ToString());
                        ObjCVarVwGateInCntrInfo.mIsHire = Convert.ToBoolean(dr["IsHire"].ToString());
                        ObjCVarVwGateInCntrInfo.misOwn = Convert.ToBoolean(dr["isOwn"].ToString());
                        ObjCVarVwGateInCntrInfo.mContainerTypesID = Convert.ToInt32(dr["ContainerTypesID"].ToString());
                        lstCVarVwGateInCntrInfo.Add(ObjCVarVwGateInCntrInfo);
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
            lstCVarVwGateInCntrInfo.Clear();

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
                Com.CommandText = "[dbo].GetListPagingVwGateInCntrInfo";
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
                        CVarVwGateInCntrInfo ObjCVarVwGateInCntrInfo = new CVarVwGateInCntrInfo();
                        ObjCVarVwGateInCntrInfo.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVwGateInCntrInfo.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarVwGateInCntrInfo.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarVwGateInCntrInfo.mCustomersName = Convert.ToString(dr["CustomersName"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_WarehouseName = Convert.ToString(dr["WH_WarehouseName"].ToString());
                        ObjCVarVwGateInCntrInfo.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_WarehouseID = Convert.ToInt32(dr["WH_WarehouseID"].ToString());
                        ObjCVarVwGateInCntrInfo.mWH_CntrStockID = Convert.ToInt32(dr["WH_CntrStockID"].ToString());
                        ObjCVarVwGateInCntrInfo.mIsHire = Convert.ToBoolean(dr["IsHire"].ToString());
                        ObjCVarVwGateInCntrInfo.misOwn = Convert.ToBoolean(dr["isOwn"].ToString());
                        ObjCVarVwGateInCntrInfo.mContainerTypesID = Convert.ToInt32(dr["ContainerTypesID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarVwGateInCntrInfo.Add(ObjCVarVwGateInCntrInfo);
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
