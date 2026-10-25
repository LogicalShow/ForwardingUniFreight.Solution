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
    public partial class CVarvwST_PreGateInDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int32 mPackageTypeIDOnContainer;
        internal Decimal mQuantity;
        internal Decimal mGrossWeightTON;
        internal Decimal mNetWeightTON;
        internal String mDescriptionOfGoods;
        internal String mDriver;
        internal String mTruckNumber;
        internal Int64 mPreGateInID;
        internal Boolean misComplete;
        internal String mDriverNumber;
        internal String mPO;
        internal Int32 mIsApproved;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
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
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
        }
        public Decimal GrossWeightTON
        {
            get { return mGrossWeightTON; }
            set { mGrossWeightTON = value; }
        }
        public Decimal NetWeightTON
        {
            get { return mNetWeightTON; }
            set { mNetWeightTON = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mDescriptionOfGoods = value; }
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
        public String DriverNumber
        {
            get { return mDriverNumber; }
            set { mDriverNumber = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
        public Int32 IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        #endregion
    }

    public partial class CvwST_PreGateInDetails
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
        public List<CVarvwST_PreGateInDetails> lstCVarvwST_PreGateInDetails = new List<CVarvwST_PreGateInDetails>();
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
            lstCVarvwST_PreGateInDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwST_PreGateInDetails";
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
                        CVarvwST_PreGateInDetails ObjCVarvwST_PreGateInDetails = new CVarvwST_PreGateInDetails();
                        ObjCVarvwST_PreGateInDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwST_PreGateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_PreGateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwST_PreGateInDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwST_PreGateInDetails.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarvwST_PreGateInDetails.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwST_PreGateInDetails.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarvwST_PreGateInDetails.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwST_PreGateInDetails.mIsApproved = Convert.ToInt32(dr["IsApproved"].ToString());
                        lstCVarvwST_PreGateInDetails.Add(ObjCVarvwST_PreGateInDetails);
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
            lstCVarvwST_PreGateInDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwST_PreGateInDetails";
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
                        CVarvwST_PreGateInDetails ObjCVarvwST_PreGateInDetails = new CVarvwST_PreGateInDetails();
                        ObjCVarvwST_PreGateInDetails.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwST_PreGateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwST_PreGateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarvwST_PreGateInDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwST_PreGateInDetails.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarvwST_PreGateInDetails.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarvwST_PreGateInDetails.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarvwST_PreGateInDetails.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarvwST_PreGateInDetails.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarvwST_PreGateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwST_PreGateInDetails.mIsApproved = Convert.ToInt32(dr["IsApproved"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwST_PreGateInDetails.Add(ObjCVarvwST_PreGateInDetails);
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
