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
    public partial class CVarFA_GetGroupsTree
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mGroupName;
        internal Int32 mAssetAccount_ID;
        internal Int32 mAssetDepreciationAccount_ID;
        internal Int32 mAssetAccumulatedDepreciationAccount_ID;
        internal Int32 mAssetExpensesAccount_ID;
        internal Int32 mAssetCostCenter_ID;
        internal Int32 mSubAccountID;
        internal Int32 mParentSubAccountID;
        internal String mAssetAccountName;
        internal String mAssetDepreciationAccountName;
        internal String mAssetAccumulatedDepreciationAccountName;
        internal String mAssetExpensesAccountName;
        internal String mSubAccountName;
        internal String mParentSubAccountName;
        internal String mCostCenterName;
        internal Int32 mGroupID;
        internal String mid;
        internal String mparent;
        internal String mtitle;
        internal String mkind;
        internal Int32 mposition;
        internal Boolean mfolder;
        internal String micon;
        internal String mextraClasses;
        internal String mNodeType;
        internal String mFullName;
        internal String mCode;
        internal int mOrderID;
        internal decimal mPercentage;
        internal decimal mActualPercentage;
        #endregion

        #region "Methods"
        public String GroupName
        {
            get { return mGroupName; }
            set { mGroupName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
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
        public Int32 GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
        }
        public String id
        {
            get { return mid; }
            set { mid = value; }
        }
        public String parent
        {
            get { return mparent; }
            set { mparent = value; }
        }
        public String title
        {
            get { return mtitle; }
            set { mtitle = value; }
        }
        public String kind
        {
            get { return mkind; }
            set { mkind = value; }
        }
        public Int32 position
        {
            get { return mposition; }
            set { mposition = value; }
        }
        public Boolean folder
        {
            get { return mfolder; }
            set { mfolder = value; }
        }
        public String icon
        {
            get { return micon; }
            set { micon = value; }
        }
        public String extraClasses
        {
            get { return mextraClasses; }
            set { mextraClasses = value; }
        }
        public String NodeType
        {
            get { return mNodeType; }
            set { mNodeType = value; }
        }
        public String FullName
        {
            get { return mFullName; }
            set { mFullName = value; }
        }
        public Int32 OrderID
        {
            get { return mOrderID; }
            set { mOrderID = value; }
        }
        public decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public decimal ActualPercentage
        {
            get { return mActualPercentage; }
            set { mActualPercentage = value; }
        }
        #endregion
    }

    public partial class CFA_GetGroupsTree
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
        public List<CVarFA_GetGroupsTree> lstCVarFA_GetGroupsTree = new List<CVarFA_GetGroupsTree>();
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
            lstCVarFA_GetGroupsTree.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_GetGroupsTree";
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
                        CVarFA_GetGroupsTree ObjCVarFA_GetGroupsTree = new CVarFA_GetGroupsTree();
                        ObjCVarFA_GetGroupsTree.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_GetGroupsTree.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetExpensesAccountName = Convert.ToString(dr["AssetExpensesAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mParentSubAccountName = Convert.ToString(dr["ParentSubAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarFA_GetGroupsTree.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_GetGroupsTree.mid = Convert.ToString(dr["id"].ToString());
                        ObjCVarFA_GetGroupsTree.mparent = Convert.ToString(dr["parent"].ToString());
                        ObjCVarFA_GetGroupsTree.mtitle = Convert.ToString(dr["title"].ToString());
                        ObjCVarFA_GetGroupsTree.mkind = Convert.ToString(dr["kind"].ToString());
                        ObjCVarFA_GetGroupsTree.mposition = Convert.ToInt32(dr["position"].ToString());
                        ObjCVarFA_GetGroupsTree.mfolder = Convert.ToBoolean(dr["folder"].ToString());
                        ObjCVarFA_GetGroupsTree.micon = Convert.ToString(dr["icon"].ToString());
                        ObjCVarFA_GetGroupsTree.mextraClasses = Convert.ToString(dr["extraClasses"].ToString());
                        ObjCVarFA_GetGroupsTree.mNodeType = Convert.ToString(dr["NodeType"].ToString());
                        ObjCVarFA_GetGroupsTree.mFullName = Convert.ToString(dr["FullName"].ToString());
                        ObjCVarFA_GetGroupsTree.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarFA_GetGroupsTree.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_GetGroupsTree.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarFA_GetGroupsTree.mActualPercentage = Convert.ToDecimal(dr["ActualPercentage"].ToString());

                        lstCVarFA_GetGroupsTree.Add(ObjCVarFA_GetGroupsTree);
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
            lstCVarFA_GetGroupsTree.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
              //  Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
              //  Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
               // Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListFA_GetGroupsTree";
             //   Com.Parameters[0].Value = PageSize;
              //  Com.Parameters[1].Value = PageNumber;
                Com.Parameters[0].Value = WhereClause;
              //  Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarFA_GetGroupsTree ObjCVarFA_GetGroupsTree = new CVarFA_GetGroupsTree();
                        ObjCVarFA_GetGroupsTree.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarFA_GetGroupsTree.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_GetGroupsTree.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccountName = Convert.ToString(dr["AssetAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetDepreciationAccountName = Convert.ToString(dr["AssetDepreciationAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetAccumulatedDepreciationAccountName = Convert.ToString(dr["AssetAccumulatedDepreciationAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mAssetExpensesAccountName = Convert.ToString(dr["AssetExpensesAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mParentSubAccountName = Convert.ToString(dr["ParentSubAccountName"].ToString());
                        ObjCVarFA_GetGroupsTree.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarFA_GetGroupsTree.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_GetGroupsTree.mid = Convert.ToString(dr["id"].ToString());
                        ObjCVarFA_GetGroupsTree.mparent = Convert.ToString(dr["parent"].ToString());
                        ObjCVarFA_GetGroupsTree.mtitle = Convert.ToString(dr["title"].ToString());
                        ObjCVarFA_GetGroupsTree.mkind = Convert.ToString(dr["kind"].ToString());
                        ObjCVarFA_GetGroupsTree.mposition = Convert.ToInt32(dr["position"].ToString());
                        ObjCVarFA_GetGroupsTree.mfolder = Convert.ToBoolean(dr["folder"].ToString());
                        ObjCVarFA_GetGroupsTree.micon = Convert.ToString(dr["icon"].ToString());
                        ObjCVarFA_GetGroupsTree.mextraClasses = Convert.ToString(dr["extraClasses"].ToString());
                        ObjCVarFA_GetGroupsTree.mNodeType = Convert.ToString(dr["NodeType"].ToString());
                        ObjCVarFA_GetGroupsTree.mFullName = Convert.ToString(dr["FullName"].ToString());
                        ObjCVarFA_GetGroupsTree.mOrderID = Convert.ToInt32(dr["OrderID"].ToString());
                        ObjCVarFA_GetGroupsTree.mPercentage = Convert.ToDecimal(dr["OrderID"].ToString());
                        ObjCVarFA_GetGroupsTree.mActualPercentage = Convert.ToDecimal(dr["ActualPercentage"].ToString());
                        ObjCVarFA_GetGroupsTree.mCode = Convert.ToString(dr["Code"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_GetGroupsTree.Add(ObjCVarFA_GetGroupsTree);
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
