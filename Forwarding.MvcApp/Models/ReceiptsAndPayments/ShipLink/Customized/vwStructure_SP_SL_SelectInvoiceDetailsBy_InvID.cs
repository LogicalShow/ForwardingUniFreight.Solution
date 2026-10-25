using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Customized
{
    [Serializable]
    public class CPKvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID
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
    public partial class CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID : CPKvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceHeaderID;
        internal Int32 mItemID;
        internal String mItemName;
        internal Decimal mItemAmount;
        internal Decimal mItemAmount_20; //coz it might be empty so i defined it as a string
        internal Decimal mItemAmount_40; //coz it might be empty so i defined it as a string
        internal Int32 mRevenueAccountID;
        internal Int32 mRevenueSubAccountID20;////////////
        internal Int32 mRevenueSubAccountID40;///////////
        internal Int32 mCostCenterID;
        internal Int32 mVoyageSubAccountID;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal String mRemarks;
        internal Decimal mPortRatio;///////////////
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
        public Decimal ItemAmount_20
        {
            get { return mItemAmount_20; }
            set { mItemAmount_20 = value; }
        }
        public Decimal ItemAmount_40
        {
            get { return mItemAmount_40; }
            set { mItemAmount_40 = value; }
        }
        public Int32 RevenueAccountID
        {
            get { return mRevenueAccountID; }
            set { mRevenueAccountID = value; }
        }
        public Int32 RevenueSubAccountID20
        {
            get { return mRevenueSubAccountID20; }
            set { mRevenueSubAccountID20 = value; }
        }
        public Int32 RevenueSubAccountID40
        {
            get { return mRevenueSubAccountID40; }
            set { mRevenueSubAccountID40 = value; }
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
        public Decimal PortRatio
        {
            get { return mPortRatio; }
            set { mPortRatio = value; }
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

    public partial class CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID
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
        public List<CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID> lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID = new List<CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID>();
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
            lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 200;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@InvoiceIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].SP_SL_SelectInvoiceDetailsBy_InvID";
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
                        CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID = new CVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID();
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.ID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mInvoiceHeaderID = dr["InvoiceHeaderID"].ToString() == "" ? 0 : Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mItemID = dr["ItemID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mItemAmount = dr["ItemAmount"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ItemAmount"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mItemAmount_20 = dr["ItemAmount_20"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ItemAmount_20"].ToString().Replace("\r", ""));
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mItemAmount_40 = dr["ItemAmount_40"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ItemAmount_40"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mRevenueAccountID = dr["RevenueAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mRevenueSubAccountID20 = dr["RevenueSubAccountID20"].ToString() == "" ? 0 : Convert.ToInt32(dr["RevenueSubAccountID20"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mRevenueSubAccountID40 = dr["RevenueSubAccountID40"].ToString() == "" ? 0 : Convert.ToInt32(dr["RevenueSubAccountID40"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mCostCenterID = dr["CostCenterID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mVoyageSubAccountID = dr["VoyageSubAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mCurrencyID = dr["CurrencyID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.PortRatio = dr["PortRatio"].ToString() == "" ? 0 : Convert.ToDecimal(dr["PortRatio"].ToString());
                        lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Add(ObjCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID);
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
