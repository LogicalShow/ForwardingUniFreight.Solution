using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PR.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwPR_ProductStagesDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mStageID;
        internal Int64 mFinalProductID;
        internal Int32 mParentStageID;
        internal Boolean mIsDeleted;
        internal Int32 mOrderNo;
        internal String mStageName;
        internal Int32 mDID;
        internal Int64 mProductID;
        internal Decimal mPercentage;
        internal Decimal mQty;
        internal Int32 mProductStageID;
        internal Int32 mUnitID;
        internal String mUnitName;
        internal Decimal mDensity;
        internal Boolean mDIsDeleted;
        internal Boolean mISIn;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 StageID
        {
            get { return mStageID; }
            set { mStageID = value; }
        }
        public Int64 FinalProductID
        {
            get { return mFinalProductID; }
            set { mFinalProductID = value; }
        }
        public Int32 ParentStageID
        {
            get { return mParentStageID; }
            set { mParentStageID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 OrderNo
        {
            get { return mOrderNo; }
            set { mOrderNo = value; }
        }
        public String StageName
        {
            get { return mStageName; }
            set { mStageName = value; }
        }
        public Int32 DID
        {
            get { return mDID; }
            set { mDID = value; }
        }
        public Int64 ProductID
        {
            get { return mProductID; }
            set { mProductID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Int32 ProductStageID
        {
            get { return mProductStageID; }
            set { mProductStageID = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mUnitID = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Decimal Density
        {
            get { return mDensity; }
            set { mDensity = value; }
        }
        public Boolean DIsDeleted
        {
            get { return mDIsDeleted; }
            set { mDIsDeleted = value; }
        }
        public Boolean ISIn
        {
            get { return mISIn; }
            set { mISIn = value; }
        }
        #endregion
    }

    public partial class CvwPR_ProductStagesDetails
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
        public List<CVarvwPR_ProductStagesDetails> lstCVarvwPR_ProductStagesDetails = new List<CVarvwPR_ProductStagesDetails>();
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
            lstCVarvwPR_ProductStagesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPR_ProductStagesDetails";
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
                        CVarvwPR_ProductStagesDetails ObjCVarvwPR_ProductStagesDetails = new CVarvwPR_ProductStagesDetails();
                        ObjCVarvwPR_ProductStagesDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mStageName = Convert.ToString(dr["StageName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDID = Convert.ToInt32(dr["DID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDIsDeleted = Convert.ToBoolean(dr["DIsDeleted"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mISIn = Convert.ToBoolean(dr["ISIn"].ToString());
                        lstCVarvwPR_ProductStagesDetails.Add(ObjCVarvwPR_ProductStagesDetails);
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
            lstCVarvwPR_ProductStagesDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPR_ProductStagesDetails";
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
                        CVarvwPR_ProductStagesDetails ObjCVarvwPR_ProductStagesDetails = new CVarvwPR_ProductStagesDetails();
                        ObjCVarvwPR_ProductStagesDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mStageName = Convert.ToString(dr["StageName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDID = Convert.ToInt32(dr["DID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mDIsDeleted = Convert.ToBoolean(dr["DIsDeleted"].ToString());
                        ObjCVarvwPR_ProductStagesDetails.mISIn = Convert.ToBoolean(dr["ISIn"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPR_ProductStagesDetails.Add(ObjCVarvwPR_ProductStagesDetails);
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
