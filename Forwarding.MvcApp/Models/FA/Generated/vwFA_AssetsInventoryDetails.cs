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
    public class CPKvwFA_AssetsInventoryDetails
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
    public partial class CVarvwFA_AssetsInventoryDetails : CPKvwFA_AssetsInventoryDetails
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
        internal String mInventoryNotes;
        internal Boolean mIsDeleted;
        internal Int32 mCode;
        internal String mBranchName;
        internal String mDevisionName;
        internal String mDepartmentName;
        internal Int32 mAssetID;
        internal Int32 mOriginalBranchID;
        internal Int32 mOriginalDevisionID;
        internal Int32 mOriginalDepartmentID;
        internal Decimal mQty;
        internal Decimal mActualQty;
        internal String mNotes;
        internal Int32 mFA_AssetInventoryID;
        internal String mOriginalBranchName;
        internal String mOriginalDevisionName;
        internal String mOriginalDepartmentName;
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
        public String InventoryNotes
        {
            get { return mInventoryNotes; }
            set { mInventoryNotes = value; }
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
        public Int32 AssetID
        {
            get { return mAssetID; }
            set { mAssetID = value; }
        }
        public Int32 OriginalBranchID
        {
            get { return mOriginalBranchID; }
            set { mOriginalBranchID = value; }
        }
        public Int32 OriginalDevisionID
        {
            get { return mOriginalDevisionID; }
            set { mOriginalDevisionID = value; }
        }
        public Int32 OriginalDepartmentID
        {
            get { return mOriginalDepartmentID; }
            set { mOriginalDepartmentID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Decimal ActualQty
        {
            get { return mActualQty; }
            set { mActualQty = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 FA_AssetInventoryID
        {
            get { return mFA_AssetInventoryID; }
            set { mFA_AssetInventoryID = value; }
        }
        public String OriginalBranchName
        {
            get { return mOriginalBranchName; }
            set { mOriginalBranchName = value; }
        }
        public String OriginalDevisionName
        {
            get { return mOriginalDevisionName; }
            set { mOriginalDevisionName = value; }
        }
        public String OriginalDepartmentName
        {
            get { return mOriginalDepartmentName; }
            set { mOriginalDepartmentName = value; }
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

    public partial class CvwFA_AssetsInventoryDetails
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
        public List<CVarvwFA_AssetsInventoryDetails> lstCVarvwFA_AssetsInventoryDetails = new List<CVarvwFA_AssetsInventoryDetails>();
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
            lstCVarvwFA_AssetsInventoryDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_AssetsInventoryDetails";
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
                        CVarvwFA_AssetsInventoryDetails ObjCVarvwFA_AssetsInventoryDetails = new CVarvwFA_AssetsInventoryDetails();
                        ObjCVarvwFA_AssetsInventoryDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mInventoryNotes = Convert.ToString(dr["InventoryNotes"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDevisionName = Convert.ToString(dr["DevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalBranchID = Convert.ToInt32(dr["OriginalBranchID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDevisionID = Convert.ToInt32(dr["OriginalDevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDepartmentID = Convert.ToInt32(dr["OriginalDepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mFA_AssetInventoryID = Convert.ToInt32(dr["FA_AssetInventoryID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalBranchName = Convert.ToString(dr["OriginalBranchName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDevisionName = Convert.ToString(dr["OriginalDevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDepartmentName = Convert.ToString(dr["OriginalDepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mUserName = Convert.ToString(dr["UserName"].ToString());
                        lstCVarvwFA_AssetsInventoryDetails.Add(ObjCVarvwFA_AssetsInventoryDetails);
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
            lstCVarvwFA_AssetsInventoryDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_AssetsInventoryDetails";
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
                        CVarvwFA_AssetsInventoryDetails ObjCVarvwFA_AssetsInventoryDetails = new CVarvwFA_AssetsInventoryDetails();
                        ObjCVarvwFA_AssetsInventoryDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mInventoryNotes = Convert.ToString(dr["InventoryNotes"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDevisionName = Convert.ToString(dr["DevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalBranchID = Convert.ToInt32(dr["OriginalBranchID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDevisionID = Convert.ToInt32(dr["OriginalDevisionID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDepartmentID = Convert.ToInt32(dr["OriginalDepartmentID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mFA_AssetInventoryID = Convert.ToInt32(dr["FA_AssetInventoryID"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalBranchName = Convert.ToString(dr["OriginalBranchName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDevisionName = Convert.ToString(dr["OriginalDevisionName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mOriginalDepartmentName = Convert.ToString(dr["OriginalDepartmentName"].ToString());
                        ObjCVarvwFA_AssetsInventoryDetails.mUserName = Convert.ToString(dr["UserName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_AssetsInventoryDetails.Add(ObjCVarvwFA_AssetsInventoryDetails);
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
