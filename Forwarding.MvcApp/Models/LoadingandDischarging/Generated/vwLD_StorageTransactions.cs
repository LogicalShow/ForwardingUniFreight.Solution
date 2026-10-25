using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.LoadingandDischarging.Generated
{
    [Serializable]
    public class CPKvwLD_StorageTransactions
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwLD_StorageTransactions : CPKvwLD_StorageTransactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mStorageID;
        internal Int32 mTransID;
        internal Int32 mStoreID;
        internal String mStoreName;
        internal Int32 mPackageTypeID;
        internal String mPackageTypeName;
        internal Int32 mCoeff;
        internal String mCoeffName;
        internal Decimal mTransTotalQty;
        #endregion

        #region "Methods"
        public Int32 StorageID
        {
            get { return mStorageID; }
            set { mStorageID = value; }
        }
        public Int32 TransID
        {
            get { return mTransID; }
            set { mTransID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mStoreID = value; }
        }
        public String StoreName
        {
            get { return mStoreName; }
            set { mStoreName = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public Int32 Coeff
        {
            get { return mCoeff; }
            set { mCoeff = value; }
        }
        public String CoeffName
        {
            get { return mCoeffName; }
            set { mCoeffName = value; }
        }
        public Decimal TransTotalQty
        {
            get { return mTransTotalQty; }
            set { mTransTotalQty = value; }
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

    public partial class CvwLD_StorageTransactions
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
        public List<CVarvwLD_StorageTransactions> lstCVarvwLD_StorageTransactions = new List<CVarvwLD_StorageTransactions>();
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
            lstCVarvwLD_StorageTransactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLD_StorageTransactions";
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
                        CVarvwLD_StorageTransactions ObjCVarvwLD_StorageTransactions = new CVarvwLD_StorageTransactions();
                        ObjCVarvwLD_StorageTransactions.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mCoeff = Convert.ToInt32(dr["Coeff"].ToString());
                        ObjCVarvwLD_StorageTransactions.mCoeffName = Convert.ToString(dr["CoeffName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mTransTotalQty = Convert.ToDecimal(dr["TransTotalQty"].ToString());
                        lstCVarvwLD_StorageTransactions.Add(ObjCVarvwLD_StorageTransactions);
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
            lstCVarvwLD_StorageTransactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLD_StorageTransactions";
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
                        CVarvwLD_StorageTransactions ObjCVarvwLD_StorageTransactions = new CVarvwLD_StorageTransactions();
                        ObjCVarvwLD_StorageTransactions.mStorageID = Convert.ToInt32(dr["StorageID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwLD_StorageTransactions.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mCoeff = Convert.ToInt32(dr["Coeff"].ToString());
                        ObjCVarvwLD_StorageTransactions.mCoeffName = Convert.ToString(dr["CoeffName"].ToString());
                        ObjCVarvwLD_StorageTransactions.mTransTotalQty = Convert.ToDecimal(dr["TransTotalQty"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLD_StorageTransactions.Add(ObjCVarvwLD_StorageTransactions);
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