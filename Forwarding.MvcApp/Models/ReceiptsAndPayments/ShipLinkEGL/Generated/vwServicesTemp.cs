using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated
{
    [Serializable]
    public class CPKvwServicesTemp
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
    public partial class CVarvwServicesTemp : CPKvwServicesTemp
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mtaxID;
        internal String mAccountName;
        internal String mSubAccountName;
        internal String mCostCenterName;
        internal String mTaxeName;
        internal String mPurchase;
        internal Int32 mIsPurchase;
        internal Decimal mServicePrice;
        internal Int32 mServiceGroupID;
        internal Int32 mServiceSubGroupID;
        internal String mPortalCode;
        internal Int32 mAccountID2;
        internal Int32 mSubAccountID2;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Int32 taxID
        {
            get { return mtaxID; }
            set { mtaxID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public String TaxeName
        {
            get { return mTaxeName; }
            set { mTaxeName = value; }
        }
        public String Purchase
        {
            get { return mPurchase; }
            set { mPurchase = value; }
        }
        public Int32 IsPurchase
        {
            get { return mIsPurchase; }
            set { mIsPurchase = value; }
        }
        public Decimal ServicePrice
        {
            get { return mServicePrice; }
            set { mServicePrice = value; }
        }
        public Int32 ServiceGroupID
        {
            get { return mServiceGroupID; }
            set { mServiceGroupID = value; }
        }
        public Int32 ServiceSubGroupID
        {
            get { return mServiceSubGroupID; }
            set { mServiceSubGroupID = value; }
        }
        public String PortalCode
        {
            get { return mPortalCode; }
            set { mPortalCode = value; }
        }
        public Int32 AccountID2
        {
            get { return mAccountID2; }
            set { mAccountID2 = value; }
        }
        public Int32 SubAccountID2
        {
            get { return mSubAccountID2; }
            set { mSubAccountID2 = value; }
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

    public partial class CvwServicesTemp
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
        public List<CVarvwServicesTemp> lstCVarvwServicesTemp = new List<CVarvwServicesTemp>();
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
            lstCVarvwServicesTemp.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwServicesTemp";
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
                        CVarvwServicesTemp ObjCVarvwServicesTemp = new CVarvwServicesTemp();
                        ObjCVarvwServicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwServicesTemp.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwServicesTemp.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwServicesTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwServicesTemp.mtaxID = Convert.ToInt32(dr["taxID"].ToString());
                        ObjCVarvwServicesTemp.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwServicesTemp.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwServicesTemp.mTaxeName = Convert.ToString(dr["TaxeName"].ToString());
                        ObjCVarvwServicesTemp.mPurchase = Convert.ToString(dr["Purchase"].ToString());
                        ObjCVarvwServicesTemp.mIsPurchase = Convert.ToInt32(dr["IsPurchase"].ToString());
                        ObjCVarvwServicesTemp.mServicePrice = Convert.ToDecimal(dr["ServicePrice"].ToString());
                        ObjCVarvwServicesTemp.mServiceGroupID = Convert.ToInt32(dr["ServiceGroupID"].ToString());
                        ObjCVarvwServicesTemp.mServiceSubGroupID = Convert.ToInt32(dr["ServiceSubGroupID"].ToString());
                        ObjCVarvwServicesTemp.mPortalCode = Convert.ToString(dr["PortalCode"].ToString());
                        ObjCVarvwServicesTemp.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        lstCVarvwServicesTemp.Add(ObjCVarvwServicesTemp);
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
            lstCVarvwServicesTemp.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwServicesTemp";
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
                        CVarvwServicesTemp ObjCVarvwServicesTemp = new CVarvwServicesTemp();
                        ObjCVarvwServicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwServicesTemp.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwServicesTemp.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwServicesTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwServicesTemp.mtaxID = Convert.ToInt32(dr["taxID"].ToString());
                        ObjCVarvwServicesTemp.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwServicesTemp.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwServicesTemp.mTaxeName = Convert.ToString(dr["TaxeName"].ToString());
                        ObjCVarvwServicesTemp.mPurchase = Convert.ToString(dr["Purchase"].ToString());
                        ObjCVarvwServicesTemp.mIsPurchase = Convert.ToInt32(dr["IsPurchase"].ToString());
                        ObjCVarvwServicesTemp.mServicePrice = Convert.ToDecimal(dr["ServicePrice"].ToString());
                        ObjCVarvwServicesTemp.mServiceGroupID = Convert.ToInt32(dr["ServiceGroupID"].ToString());
                        ObjCVarvwServicesTemp.mServiceSubGroupID = Convert.ToInt32(dr["ServiceSubGroupID"].ToString());
                        ObjCVarvwServicesTemp.mPortalCode = Convert.ToString(dr["PortalCode"].ToString());
                        ObjCVarvwServicesTemp.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarvwServicesTemp.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwServicesTemp.Add(ObjCVarvwServicesTemp);
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
