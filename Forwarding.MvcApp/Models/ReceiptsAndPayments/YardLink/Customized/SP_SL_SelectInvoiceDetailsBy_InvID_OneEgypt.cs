using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLink.Customized
{
    [Serializable]
    public class CPKvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt
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
    public partial class CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt : CPKvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceHeaderID;
        internal Int32 mItemID;
        internal String mItemName;
        internal Decimal mItemAmount;
        internal Int32 mRevenueAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mVoyageSubAccountID;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal String mRemarks;
        #endregion

        #region "Methods"
        public Int64 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
        }
        public Int32 ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public Decimal ItemAmount
        {
            get { return mItemAmount; }
            set { mItemAmount = value; }
        }
        public Int32 RevenueAccountID
        {
            get { return mRevenueAccountID; }
            set { mRevenueAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Int32 VoyageSubAccountID
        {
            get { return mVoyageSubAccountID; }
            set { mVoyageSubAccountID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
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

    public partial class CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt
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
        public List<CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt> lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt = new List<CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string InvoiceID)
        {
            return DataFill(InvoiceID, true);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@InvoiceIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt";
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
                        CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt = new CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt();
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.ID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mInvoiceHeaderID = dr["InvoiceHeaderID"].ToString() == "" ? 0 : Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mItemID = dr["ItemID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mItemAmount = dr["ItemAmount"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ItemAmount"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mRevenueAccountID = dr["RevenueAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mCostCenterID = dr["CostCenterID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mVoyageSubAccountID = dr["VoyageSubAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mCurrencyID = dr["CurrencyID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.Add(ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt);
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
