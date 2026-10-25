using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKvwFA_AssetsGroups
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
    public partial class CVarvwFA_AssetsGroups : CPKvwFA_AssetsGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAssetAccount_ID;
        internal Int32 mAssetDepreciationAccount_ID;
        internal Int32 mAssetAccumulatedDepreciationAccount_ID;
        internal Int32 mAssetExpensesAccount_ID;
        internal Int32 mAssetCostCenter_ID;
        internal Int32 mSubAccountID;
        internal Int32 mParentSubAccountID;
        internal Decimal mPercentage;
        internal String mCode;
        internal String mAssetAccountName;
        internal String mAssetDepreciationAccountName;
        internal String mAssetAccumulatedDepreciationAccountName;
        internal String mAssetExpensesAccountName;
        internal String mSubAccountName;
        internal String mParentSubAccountName;
        internal String mCostCenterName;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 AssetAccount_ID
        {
            get { return mAssetAccount_ID; }
            set { mAssetAccount_ID = value; }
        }
        public Int32 AssetDepreciationAccount_ID
        {
            get { return mAssetDepreciationAccount_ID; }
            set { mAssetDepreciationAccount_ID = value; }
        }
        public Int32 AssetAccumulatedDepreciationAccount_ID
        {
            get { return mAssetAccumulatedDepreciationAccount_ID; }
            set { mAssetAccumulatedDepreciationAccount_ID = value; }
        }
        public Int32 AssetExpensesAccount_ID
        {
            get { return mAssetExpensesAccount_ID; }
            set { mAssetExpensesAccount_ID = value; }
        }
        public Int32 AssetCostCenter_ID
        {
            get { return mAssetCostCenter_ID; }
            set { mAssetCostCenter_ID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public Int32 ParentSubAccountID
        {
            get { return mParentSubAccountID; }
            set { mParentSubAccountID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String AssetAccountName
        {
            get { return mAssetAccountName; }
            set { mAssetAccountName = value; }
        }
        public String AssetDepreciationAccountName
        {
            get { return mAssetDepreciationAccountName; }
            set { mAssetDepreciationAccountName = value; }
        }
        public String AssetAccumulatedDepreciationAccountName
        {
            get { return mAssetAccumulatedDepreciationAccountName; }
            set { mAssetAccumulatedDepreciationAccountName = value; }
        }
        public String AssetExpensesAccountName
        {
            get { return mAssetExpensesAccountName; }
            set { mAssetExpensesAccountName = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public String ParentSubAccountName
        {
            get { return mParentSubAccountName; }
            set { mParentSubAccountName = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
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

    public partial class CvwFA_AssetsGroups
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
        public List<CVarvwFA_AssetsGroups> lstCVarvwFA_AssetsGroups = new List<CVarvwFA_AssetsGroups>();
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
            lstCVarvwFA_AssetsGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_AssetsGroups";
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
                        CVarvwFA_AssetsGroups ObjCVarvwFA_AssetsGroups = new CVarvwFA_AssetsGroups();
                        ObjCVarvwFA_AssetsGroups.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_AssetsGroups.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetExpensesAccountName = Convert.ToString(dr["AssetExpensesAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mParentSubAccountName = Convert.ToString(dr["ParentSubAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        lstCVarvwFA_AssetsGroups.Add(ObjCVarvwFA_AssetsGroups);
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
            lstCVarvwFA_AssetsGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_AssetsGroups";
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
                        CVarvwFA_AssetsGroups ObjCVarvwFA_AssetsGroups = new CVarvwFA_AssetsGroups();
                        ObjCVarvwFA_AssetsGroups.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarvwFA_AssetsGroups.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_AssetsGroups.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mAssetExpensesAccountName = Convert.ToString(dr["AssetExpensesAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mParentSubAccountName = Convert.ToString(dr["ParentSubAccountName"].ToString());
                        ObjCVarvwFA_AssetsGroups.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_AssetsGroups.Add(ObjCVarvwFA_AssetsGroups);
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
