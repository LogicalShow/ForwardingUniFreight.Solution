using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKvwA_CostCenters
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
    public partial class CVarvwA_CostCenters : CPKvwA_CostCenters
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mEnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mCCLevel;
        internal String mRealCostCenterCode;
        internal Int32 mUser_ID;
        internal Int32 mType_ID;
        internal Boolean mIsClosed;
        internal Int32 mSubAccountGroupID;
        internal Int32 mEmployeesCount;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mParent_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
        }
        public Int32 CCLevel
        {
            get { return mCCLevel; }
            set { mCCLevel = value; }
        }
        public String RealCostCenterCode
        {
            get { return mRealCostCenterCode; }
            set { mRealCostCenterCode = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mUser_ID = value; }
        }
        public Int32 Type_ID
        {
            get { return mType_ID; }
            set { mType_ID = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsClosed = value; }
        }
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mSubAccountGroupID = value; }
        }
        public Int32 EmployeesCount
        {
            get { return mEmployeesCount; }
            set { mEmployeesCount = value; }
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

    public partial class CvwA_CostCenters
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
        public List<CVarvwA_CostCenters> lstCVarvwA_CostCenters = new List<CVarvwA_CostCenters>();
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
            lstCVarvwA_CostCenters.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_CostCenters";
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
                        CVarvwA_CostCenters ObjCVarvwA_CostCenters = new CVarvwA_CostCenters();
                        ObjCVarvwA_CostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CostCenters.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_CostCenters.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_CostCenters.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_CostCenters.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_CostCenters.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_CostCenters.mCCLevel = Convert.ToInt32(dr["CCLevel"].ToString());
                        ObjCVarvwA_CostCenters.mRealCostCenterCode = Convert.ToString(dr["RealCostCenterCode"].ToString());
                        ObjCVarvwA_CostCenters.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_CostCenters.mType_ID = Convert.ToInt32(dr["Type_ID"].ToString());
                        ObjCVarvwA_CostCenters.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwA_CostCenters.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwA_CostCenters.mEmployeesCount = Convert.ToInt32(dr["EmployeesCount"].ToString());
                        lstCVarvwA_CostCenters.Add(ObjCVarvwA_CostCenters);
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
            lstCVarvwA_CostCenters.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_CostCenters";
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
                        CVarvwA_CostCenters ObjCVarvwA_CostCenters = new CVarvwA_CostCenters();
                        ObjCVarvwA_CostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CostCenters.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_CostCenters.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_CostCenters.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_CostCenters.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_CostCenters.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_CostCenters.mCCLevel = Convert.ToInt32(dr["CCLevel"].ToString());
                        ObjCVarvwA_CostCenters.mRealCostCenterCode = Convert.ToString(dr["RealCostCenterCode"].ToString());
                        ObjCVarvwA_CostCenters.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_CostCenters.mType_ID = Convert.ToInt32(dr["Type_ID"].ToString());
                        ObjCVarvwA_CostCenters.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwA_CostCenters.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwA_CostCenters.mEmployeesCount = Convert.ToInt32(dr["EmployeesCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_CostCenters.Add(ObjCVarvwA_CostCenters);
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
