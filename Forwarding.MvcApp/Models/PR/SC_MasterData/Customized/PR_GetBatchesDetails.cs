using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Customized
{
    [Serializable]
    public class CPKPR_GetBatchesDetails
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarPR_GetBatchesDetails : CPKPR_GetBatchesDetails
    {
        #region "variables"
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
        internal Decimal mExpectedQty;
        internal Int32 mProductStageID;
        internal Int32 mUnitID;
        internal String mUnitName;
        internal Decimal mDensity;
        internal Boolean mDIsDeleted;
        internal Boolean mISIn;
        internal Int64 mFinalProduct_ItemID;
        internal Decimal mCostPrice;
        internal Decimal mActualQty;
        internal Decimal mCostLiter;
        internal Int32 mQtyFactor;
        internal String mNotes;
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
        public Decimal ExpectedQty
        {
            get { return mExpectedQty; }
            set { mExpectedQty = value; }
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
        public Int64 FinalProduct_ItemID
        {
            get { return mFinalProduct_ItemID; }
            set { mFinalProduct_ItemID = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mCostPrice = value; }
        }
        public Decimal ActualQty
        {
            get { return mActualQty; }
            set { mActualQty = value; }
        }
        public Decimal CostLiter
        {
            get { return mCostLiter; }
            set { mCostLiter = value; }
        }
        public Int32 QtyFactor
        {
            get { return mQtyFactor; }
            set { mQtyFactor = value; }
        }
        public string Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        #endregion

        #region Functions
        #endregion

    }

    public partial class CPR_GetBatchesDetails
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
        public List<CVarPR_GetBatchesDetails> lstCVarPR_GetBatchesDetails = new List<CVarPR_GetBatchesDetails>();
        #endregion

        #region "Select Methods"
        public Exception GetList(long ItemID , int StoreID  ,DateTime Date , int TransactionID )
        {
            return DataFill(ItemID, StoreID, Date , TransactionID , true);
        }
        private string CheckIsNull(string str)
        {
            return (str == null || str == String.Empty || str.Trim() == ""  ) ? "0" : str;
        }
        

        //(@ItemID bigint, @StoreID int , @Date as DATETIME , @TransactionID AS int)
        private Exception DataFill(long ItemID, int StoreID, DateTime Date, int TransactionID , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPR_GetBatchesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                    Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                    // (@ItemID bigint, @StoreID int , @Date as DATETIME , @TransactionID AS int)
                    Com.CommandText = "[dbo].[PR_GetBatchesDetails]";
                    Com.Parameters[0].Value = ItemID;
                    Com.Parameters[1].Value = StoreID;
                    Com.Parameters[2].Value = Date;
                    Com.Parameters[3].Value = TransactionID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarPR_GetBatchesDetails ObjCVarPR_GetBatchesDetails = new CVarPR_GetBatchesDetails();
                        // CVarPR_GetBatchesDetails ObjCVarPR_GetBatchesDetails = new CVarPR_GetBatchesDetails();
                        var a = dr["ParentStageID"].ToString();
                        ObjCVarPR_GetBatchesDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPR_GetBatchesDetails.mStageID = Convert.ToInt32(CheckIsNull(dr["StageID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mFinalProductID = Convert.ToInt64(CheckIsNull(dr["FinalProductID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mParentStageID = Convert.ToInt32(CheckIsNull(dr["ParentStageID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mIsDeleted = Convert.ToBoolean((CheckIsNull(dr["IsDeleted"].ToString()) == "0" ? "false" : dr["IsDeleted"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mOrderNo = Convert.ToInt32(CheckIsNull(dr["OrderNo"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mStageName = Convert.ToString(CheckIsNull(dr["StageName"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mDID = Convert.ToInt32(CheckIsNull(dr["DID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mProductID = Convert.ToInt64(CheckIsNull(dr["ProductID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mPercentage = Convert.ToDecimal(CheckIsNull(dr["Percentage"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mExpectedQty = Convert.ToDecimal(CheckIsNull(dr["ExpectedQty"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mProductStageID = Convert.ToInt32(CheckIsNull(dr["ProductStageID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mUnitID = Convert.ToInt32(CheckIsNull(dr["UnitID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mUnitName = Convert.ToString(CheckIsNull(dr["UnitName"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mDensity = Convert.ToDecimal(CheckIsNull(dr["Density"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mDIsDeleted = Convert.ToBoolean((CheckIsNull(dr["DIsDeleted"].ToString()) == "0" ? "false" : dr["DIsDeleted"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mISIn = Convert.ToBoolean((CheckIsNull(dr["ISIn"].ToString()) == "0" ? "false" : dr["ISIn"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mFinalProduct_ItemID = Convert.ToInt64(CheckIsNull(dr["FinalProduct_ItemID"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mCostPrice = Convert.ToDecimal(CheckIsNull(dr["CostPrice"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mActualQty = Convert.ToDecimal(CheckIsNull(dr["ActualQty"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mCostLiter = Convert.ToDecimal(CheckIsNull(dr["CostLiter"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mQtyFactor = Convert.ToInt32(CheckIsNull(dr["QtyFactor"].ToString()));
                        ObjCVarPR_GetBatchesDetails.mNotes = Convert.ToString(CheckIsNull(dr["Notes"].ToString()));
                        lstCVarPR_GetBatchesDetails.Add(ObjCVarPR_GetBatchesDetails);
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
