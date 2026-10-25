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
    public partial class CVarSp_Packing
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mCode;
        internal DateTime mDate;
        internal String mNote;
        internal Int32 mContainerID;
        internal String mContainerNumber;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mGateInDetailsID;
        internal Int32 mPreGateInDetailsID;
        internal Int32 mStoreID;
        internal String mPO;
        internal String mLot;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mDate = value; }
        }
        public String Note
        {
            get { return mNote; }
            set { mNote = value; }
        }
        public Int32 ContainerID
        {
            get { return mContainerID; }
            set { mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
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
        public Int32 GateInDetailsID
        {
            get { return mGateInDetailsID; }
            set { mGateInDetailsID = value; }
        }
        public Int32 PreGateInDetailsID
        {
            get { return mPreGateInDetailsID; }
            set { mPreGateInDetailsID = value; }
        }
         public Int32 StoreID
        {
            get { return mStoreID; }
            set { mStoreID = value; }
        }

           public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
		public String Lot
		{
            get { return mLot; }
            set { mLot = value; }
        }


        #endregion
    }

    public partial class CSp_Packing
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
        public List<CVarSp_Packing> lstCVarSp_Packing = new List<CVarSp_Packing>();
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
            lstCVarSp_Packing.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].Sp_Packing";
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
                        CVarSp_Packing ObjCVarSp_Packing = new CVarSp_Packing();
                        ObjCVarSp_Packing.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSp_Packing.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarSp_Packing.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarSp_Packing.mNote = Convert.ToString(dr["Note"].ToString());
                        ObjCVarSp_Packing.mContainerID = Convert.ToInt32(dr["ContainerID"].ToString());
                        ObjCVarSp_Packing.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarSp_Packing.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarSp_Packing.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarSp_Packing.mGateInDetailsID = Convert.ToInt32(dr["GateInDetailsID"].ToString());
                        ObjCVarSp_Packing.mPreGateInDetailsID = Convert.ToInt32(dr["PreGateInDetailsID"].ToString());
                        ObjCVarSp_Packing.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSp_Packing.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarSp_Packing.mLot = Convert.ToString(dr["Lot"].ToString());

                        lstCVarSp_Packing.Add(ObjCVarSp_Packing);
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
            lstCVarSp_Packing.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingSp_Packing";
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
                        CVarSp_Packing ObjCVarSp_Packing = new CVarSp_Packing();
                        ObjCVarSp_Packing.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSp_Packing.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarSp_Packing.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarSp_Packing.mNote = Convert.ToString(dr["Note"].ToString());
                        ObjCVarSp_Packing.mContainerID = Convert.ToInt32(dr["ContainerID"].ToString());
                        ObjCVarSp_Packing.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarSp_Packing.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarSp_Packing.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarSp_Packing.mGateInDetailsID = Convert.ToInt32(dr["GateInDetailsID"].ToString());
                        ObjCVarSp_Packing.mPreGateInDetailsID = Convert.ToInt32(dr["PreGateInDetailsID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSp_Packing.Add(ObjCVarSp_Packing);
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
