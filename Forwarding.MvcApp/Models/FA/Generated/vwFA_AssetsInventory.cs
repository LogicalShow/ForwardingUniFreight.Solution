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
    public class CPKvwFA_AssetsInventory
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
    public partial class CVarvwFA_AssetsInventory : CPKvwFA_AssetsInventory
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mType;
        internal String mTypeName;
        internal Int32 mBranchID;
        internal Int32 mDevisionID;
        internal Int32 mDepartmentID;
        internal DateTime mDate;
        internal Boolean mIsApproved;
        internal Int32 mUserID;
        internal String mNotes;
        internal Boolean mIsDeleted;
        internal Int32 mCode;
        internal String mBranchName;
        internal String mDevisionName;
        internal String mDepartmentName;
        internal String mUserName;
        #endregion

        #region "Methods"
        public Int32 Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public String TypeName
        {
            get { return mTypeName; }
            set { mTypeName = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 DevisionID
        {
            get { return mDevisionID; }
            set { mDevisionID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mDate = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String DevisionName
        {
            get { return mDevisionName; }
            set { mDevisionName = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
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

    public partial class CvwFA_AssetsInventory
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
        public List<CVarvwFA_AssetsInventory> lstCVarvwFA_AssetsInventory = new List<CVarvwFA_AssetsInventory>();
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
            lstCVarvwFA_AssetsInventory.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_AssetsInventory";
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
                        CVarvwFA_AssetsInventory ObjCVarvwFA_AssetsInventory = new CVarvwFA_AssetsInventory();
                        ObjCVarvwFA_AssetsInventory.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwFA_AssetsInventory.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwFA_AssetsInventory.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_AssetsInventory.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_AssetsInventory.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_AssetsInventory.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsInventory.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDevisionName = Convert.ToString(dr["DevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mUserName = Convert.ToString(dr["UserName"].ToString());
                        lstCVarvwFA_AssetsInventory.Add(ObjCVarvwFA_AssetsInventory);
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
            lstCVarvwFA_AssetsInventory.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_AssetsInventory";
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
                        CVarvwFA_AssetsInventory ObjCVarvwFA_AssetsInventory = new CVarvwFA_AssetsInventory();
                        ObjCVarvwFA_AssetsInventory.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwFA_AssetsInventory.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwFA_AssetsInventory.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_AssetsInventory.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_AssetsInventory.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_AssetsInventory.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_AssetsInventory.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsInventory.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDevisionName = Convert.ToString(dr["DevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventory.mUserName = Convert.ToString(dr["UserName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_AssetsInventory.Add(ObjCVarvwFA_AssetsInventory);
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
