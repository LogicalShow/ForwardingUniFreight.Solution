using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwWH_PackageTypeConversion
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mPurchaseItemID;
        internal Int32 mFromPackageTypeID;
        internal String mFromPackageTypeName;
        internal Int32 mToPackageTypeID;
        internal String mToPackageTypeName;
        internal Decimal mFactor;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public Int32 FromPackageTypeID
        {
            get { return mFromPackageTypeID; }
            set { mFromPackageTypeID = value; }
        }
        public String FromPackageTypeName
        {
            get { return mFromPackageTypeName; }
            set { mFromPackageTypeName = value; }
        }
        public Int32 ToPackageTypeID
        {
            get { return mToPackageTypeID; }
            set { mToPackageTypeID = value; }
        }
        public String ToPackageTypeName
        {
            get { return mToPackageTypeName; }
            set { mToPackageTypeName = value; }
        }
        public Decimal Factor
        {
            get { return mFactor; }
            set { mFactor = value; }
        }
        #endregion
    }

    public partial class CvwWH_PackageTypeConversion
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
        public List<CVarvwWH_PackageTypeConversion> lstCVarvwWH_PackageTypeConversion = new List<CVarvwWH_PackageTypeConversion>();
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
            lstCVarvwWH_PackageTypeConversion.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_PackageTypeConversion";
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
                        CVarvwWH_PackageTypeConversion ObjCVarvwWH_PackageTypeConversion = new CVarvwWH_PackageTypeConversion();
                        ObjCVarvwWH_PackageTypeConversion.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFromPackageTypeID = Convert.ToInt32(dr["FromPackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFromPackageTypeName = Convert.ToString(dr["FromPackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mToPackageTypeID = Convert.ToInt32(dr["ToPackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mToPackageTypeName = Convert.ToString(dr["ToPackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFactor = Convert.ToDecimal(dr["Factor"].ToString());
                        lstCVarvwWH_PackageTypeConversion.Add(ObjCVarvwWH_PackageTypeConversion);
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
            lstCVarvwWH_PackageTypeConversion.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_PackageTypeConversion";
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
                        CVarvwWH_PackageTypeConversion ObjCVarvwWH_PackageTypeConversion = new CVarvwWH_PackageTypeConversion();
                        ObjCVarvwWH_PackageTypeConversion.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFromPackageTypeID = Convert.ToInt32(dr["FromPackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFromPackageTypeName = Convert.ToString(dr["FromPackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mToPackageTypeID = Convert.ToInt32(dr["ToPackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mToPackageTypeName = Convert.ToString(dr["ToPackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeConversion.mFactor = Convert.ToDecimal(dr["Factor"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_PackageTypeConversion.Add(ObjCVarvwWH_PackageTypeConversion);
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
