using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
    [Serializable]
    public class CPKvwSecRoleCustomizedTabs
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
    public partial class CVarvwSecRoleCustomizedTabs : CPKvwSecRoleCustomizedTabs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mRoleID;
        internal Int32 mSecCustomizedTabID;
        internal String mTabCode;
        internal String mTabName;
        internal Boolean mCanView;
        internal Boolean mCanAdd;
        internal Boolean mCanEdit;
        internal Boolean mCanDelete;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mFormID;
        #endregion

        #region "Methods"
        public Int32 RoleID
        {
            get { return mRoleID; }
            set { mRoleID = value; }
        }
        public Int32 SecCustomizedTabID
        {
            get { return mSecCustomizedTabID; }
            set { mSecCustomizedTabID = value; }
        }
        public String TabCode
        {
            get { return mTabCode; }
            set { mTabCode = value; }
        }
        public String TabName
        {
            get { return mTabName; }
            set { mTabName = value; }
        }
        public Boolean CanView
        {
            get { return mCanView; }
            set { mCanView = value; }
        }
        public Boolean CanAdd
        {
            get { return mCanAdd; }
            set { mCanAdd = value; }
        }
        public Boolean CanEdit
        {
            get { return mCanEdit; }
            set { mCanEdit = value; }
        }
        public Boolean CanDelete
        {
            get { return mCanDelete; }
            set { mCanDelete = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 FormID
        {
            get { return mFormID; }
            set { mFormID = value; }
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

    public partial class CvwSecRoleCustomizedTabs
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
        public List<CVarvwSecRoleCustomizedTabs> lstCVarvwSecRoleCustomizedTabs = new List<CVarvwSecRoleCustomizedTabs>();
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
            lstCVarvwSecRoleCustomizedTabs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwSecRoleCustomizedTabs";
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
                        CVarvwSecRoleCustomizedTabs ObjCVarvwSecRoleCustomizedTabs = new CVarvwSecRoleCustomizedTabs();
                        ObjCVarvwSecRoleCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mTabCode = Convert.ToString(dr["TabCode"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mTabName = Convert.ToString(dr["TabName"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        lstCVarvwSecRoleCustomizedTabs.Add(ObjCVarvwSecRoleCustomizedTabs);
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
            lstCVarvwSecRoleCustomizedTabs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSecRoleCustomizedTabs";
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
                        CVarvwSecRoleCustomizedTabs ObjCVarvwSecRoleCustomizedTabs = new CVarvwSecRoleCustomizedTabs();
                        ObjCVarvwSecRoleCustomizedTabs.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mSecCustomizedTabID = Convert.ToInt32(dr["SecCustomizedTabID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mTabCode = Convert.ToString(dr["TabCode"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mTabName = Convert.ToString(dr["TabName"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanView = Convert.ToBoolean(dr["CanView"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanAdd = Convert.ToBoolean(dr["CanAdd"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanEdit = Convert.ToBoolean(dr["CanEdit"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCanDelete = Convert.ToBoolean(dr["CanDelete"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSecRoleCustomizedTabs.mFormID = Convert.ToInt32(dr["FormID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSecRoleCustomizedTabs.Add(ObjCVarvwSecRoleCustomizedTabs);
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
