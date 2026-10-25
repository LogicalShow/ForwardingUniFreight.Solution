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
    public partial class CVarvwWH_PackageTypeBarCode
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mPurchaseItemID;
        internal Int32 mPackageTypeID;
        internal String mPackageTypeName;
        internal String mBarCode;
        internal String mBarCode1;
        internal String mColor;
        internal String mModel;
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
        public String BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
        }
        public String BarCode1
        {
            get { return mBarCode1; }
            set { mBarCode1 = value; }
        }
        public String Color
        {
            get { return mColor; }
            set { mColor = value; }
        }
        public String Model
        {
            get { return mModel; }
            set { mModel = value; }
        }
        #endregion
    }

    public partial class CvwWH_PackageTypeBarCode
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
        public List<CVarvwWH_PackageTypeBarCode> lstCVarvwWH_PackageTypeBarCode = new List<CVarvwWH_PackageTypeBarCode>();
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
            lstCVarvwWH_PackageTypeBarCode.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_PackageTypeBarCode";
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
                        CVarvwWH_PackageTypeBarCode ObjCVarvwWH_PackageTypeBarCode = new CVarvwWH_PackageTypeBarCode();
                        ObjCVarvwWH_PackageTypeBarCode.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mBarCode1 = Convert.ToString(dr["BarCode1"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mModel = Convert.ToString(dr["Model"].ToString());
                        lstCVarvwWH_PackageTypeBarCode.Add(ObjCVarvwWH_PackageTypeBarCode);
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
            lstCVarvwWH_PackageTypeBarCode.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_PackageTypeBarCode";
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
                        CVarvwWH_PackageTypeBarCode ObjCVarvwWH_PackageTypeBarCode = new CVarvwWH_PackageTypeBarCode();
                        ObjCVarvwWH_PackageTypeBarCode.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mBarCode1 = Convert.ToString(dr["BarCode1"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwWH_PackageTypeBarCode.mModel = Convert.ToString(dr["Model"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_PackageTypeBarCode.Add(ObjCVarvwWH_PackageTypeBarCode);
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
