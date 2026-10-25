using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwSC_ItemsAndCurrentBalanceInAllStores
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mItemID;
        internal String mItemName;
        internal String mItemCode;
        internal Int32 mPackageTypeID;
        internal Decimal mMaxQty;
        internal Decimal mMinQty;
        internal String mUnitName;
        internal Decimal mItemQtyInAllStores;
        #endregion

        #region "Methods"
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public String ItemCode
        {
            get { return mItemCode; }
            set { mItemCode = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public Decimal MaxQty
        {
            get { return mMaxQty; }
            set { mMaxQty = value; }
        }
        public Decimal MinQty
        {
            get { return mMinQty; }
            set { mMinQty = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Decimal ItemQtyInAllStores
        {
            get { return mItemQtyInAllStores; }
            set { mItemQtyInAllStores = value; }
        }
        #endregion
    }

    public partial class CvwSC_ItemsAndCurrentBalanceInAllStores
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
        public List<CVarvwSC_ItemsAndCurrentBalanceInAllStores> lstCVarvwSC_ItemsAndCurrentBalanceInAllStores = new List<CVarvwSC_ItemsAndCurrentBalanceInAllStores>();
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
            lstCVarvwSC_ItemsAndCurrentBalanceInAllStores.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_ItemsAndCurrentBalanceInAllStores";
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
                        CVarvwSC_ItemsAndCurrentBalanceInAllStores ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores = new CVarvwSC_ItemsAndCurrentBalanceInAllStores();
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemQtyInAllStores = Convert.ToDecimal(dr["ItemQtyInAllStores"].ToString());
                        lstCVarvwSC_ItemsAndCurrentBalanceInAllStores.Add(ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores);
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
            lstCVarvwSC_ItemsAndCurrentBalanceInAllStores.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_ItemsAndCurrentBalanceInAllStores";
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
                        CVarvwSC_ItemsAndCurrentBalanceInAllStores ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores = new CVarvwSC_ItemsAndCurrentBalanceInAllStores();
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores.mItemQtyInAllStores = Convert.ToDecimal(dr["ItemQtyInAllStores"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_ItemsAndCurrentBalanceInAllStores.Add(ObjCVarvwSC_ItemsAndCurrentBalanceInAllStores);
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
