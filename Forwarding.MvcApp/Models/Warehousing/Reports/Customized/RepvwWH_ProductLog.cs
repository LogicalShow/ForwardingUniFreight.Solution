using System;
using System.Collections.Generic;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Customized
{
    [Serializable]
    public partial class CVarRepvwWH_ProductLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPurchaseItemID;
        internal String mStockUnit;
        internal Decimal mOpeningQty;
        internal Decimal mOpeningWeight;
        internal Decimal mOpeningVolume;
        internal Decimal mReceiptQty;
        internal Decimal mReceiptWeight;
        internal Decimal mReceiptVolume;
        internal String mPurchaseItemCode;
        internal Decimal mDispatchQty;
        internal Decimal mDispatchWeight;
        internal Decimal mDispatchVolume;

        internal String mPartNumber;
        internal String mHSCode;
        internal String mModelNumber;
        internal String mBrandName;
        internal String mProductType;
        internal Decimal mGrossWeight;
        internal Decimal mVolume;
        internal String mNotes;
        internal String mContainerNumber;
        internal String mExtra1;
        internal String mExtra2;
        internal String mExtra3;
        internal String mExtra4;
        internal String mExtra5;
        internal String mExtra6;
        internal String mExtra7;
        internal String mExtra8;
        internal String mExtra9;
        internal Boolean mIsDefected;
        #endregion

        #region "Methods"
        public Int32 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public String StockUnit
        {
            get { return mStockUnit; }
            set { mStockUnit = value; }
        }
        public Decimal OpeningQty
        {
            get { return mOpeningQty; }
            set { mOpeningQty = value; }
        }
        public Decimal OpeningWeight
        {
            get { return mOpeningWeight; }
            set { mOpeningWeight = value; }
        }
        public Decimal OpeningVolume
        {
            get { return mOpeningVolume; }
            set { mOpeningVolume = value; }
        }
        public Decimal ReceiptQty
        {
            get { return mReceiptQty; }
            set { mReceiptQty = value; }
        }
        public Decimal ReceiptWeight
        {
            get { return mReceiptWeight; }
            set { mReceiptWeight = value; }
        }
        public Decimal ReceiptVolume
        {
            get { return mReceiptVolume; }
            set { mReceiptVolume = value; }
        }
        public String PurchaseItemCode
        {
            get { return mPurchaseItemCode; }
            set { mPurchaseItemCode = value; }
        }
        public Decimal DispatchQty
        {
            get { return mDispatchQty; }
            set { mDispatchQty = value; }
        }
        public Decimal DispatchWeight
        {
            get { return mDispatchWeight; }
            set { mDispatchWeight = value; }
        }
        public Decimal DispatchVolume
        {
            get { return mDispatchVolume; }
            set { mDispatchVolume = value; }
        }

        public String PartNumber
        {
            get { return mPartNumber; }
            set { mPartNumber = value; }
        }
        public String HSCode
        {
            get { return mHSCode; }
            set { mHSCode = value; }
        }
        public String ModelNumber
        {
            get { return mModelNumber; }
            set { mModelNumber = value; }
        }
        public String BrandName
        {
            get { return mBrandName; }
            set { mBrandName = value; }
        }
        public String ProductType
        {
            get { return mProductType; }
            set { mProductType = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mVolume = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
		public String ContainerNumber
		{
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
		public String Extra1
		{
            get { return mExtra1; }
            set { mExtra1 = value; }
        }public String Extra2
		{
            get { return mExtra2; }
            set { mExtra2 = value; }
        }public String Extra3
		{
            get { return mExtra3; }
            set { mExtra3 = value; }
        }public String Extra4
		{
            get { return mExtra4; }
            set { mExtra4 = value; }
        }public String Extra5
		{
            get { return mExtra5; }
            set { mExtra5 = value; }
        }public String Extra6
		{
            get { return mExtra6; }
            set { mExtra6 = value; }
        }public String Extra7
		{
            get { return mExtra7; }
            set { mExtra7 = value; }
        }public String Extra8
		{
            get { return mExtra8; }
            set { mExtra8 = value; }
        }
		public String Extra9
		{
            get { return mExtra9; }
            set { mExtra9 = value; }
        }
		public Boolean IsDefected
		{
            get { return mIsDefected; }
            set { mIsDefected = value; }
        }
        
        #endregion
    }

    public partial class CRepvwWH_ProductLog
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
        public List<CVarRepvwWH_ProductLog> lstCVarRepvwWH_ProductLog = new List<CVarRepvwWH_ProductLog>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime From, DateTime To, int CustomerID)
        {
            return DataFill(From, To, CustomerID, true);
        }
        private Exception DataFill(DateTime From, DateTime To, int CustomerID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRepvwWH_ProductLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@From", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@To", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));

                    Com.CommandText = "[dbo].RepvwWH_ProductLog";
                    Com.Parameters[0].Value = From;
                    Com.Parameters[1].Value = To;
                    Com.Parameters[2].Value = CustomerID;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRepvwWH_ProductLog ObjCVarRepvwWH_ProductLog = new CVarRepvwWH_ProductLog();
                        ObjCVarRepvwWH_ProductLog.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
                        ObjCVarRepvwWH_ProductLog.mStockUnit = Convert.ToString(dr["StockUnit"].ToString());
                        ObjCVarRepvwWH_ProductLog.mOpeningQty = Convert.ToDecimal(dr["OpeningQty"].ToString());
                        ObjCVarRepvwWH_ProductLog.mOpeningWeight = Convert.ToDecimal(dr["OpeningWeight"].ToString());
                        ObjCVarRepvwWH_ProductLog.mOpeningVolume = Convert.ToDecimal(dr["OpeningVolume"].ToString());
                        ObjCVarRepvwWH_ProductLog.mReceiptQty = Convert.ToDecimal(dr["ReceiptQty"].ToString());
                        ObjCVarRepvwWH_ProductLog.mReceiptWeight = Convert.ToDecimal(dr["ReceiptWeight"].ToString());
                        ObjCVarRepvwWH_ProductLog.mReceiptVolume = Convert.ToDecimal(dr["ReceiptVolume"].ToString());
                        ObjCVarRepvwWH_ProductLog.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarRepvwWH_ProductLog.mDispatchQty = Convert.ToDecimal(dr["DispatchQty"].ToString());
                        ObjCVarRepvwWH_ProductLog.mDispatchWeight = Convert.ToDecimal(dr["DispatchWeight"].ToString());
                        ObjCVarRepvwWH_ProductLog.mDispatchVolume = Convert.ToDecimal(dr["DispatchVolume"].ToString());

                        ObjCVarRepvwWH_ProductLog.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarRepvwWH_ProductLog.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarRepvwWH_ProductLog.mModelNumber = Convert.ToString(dr["ModelNumber"].ToString());
                        ObjCVarRepvwWH_ProductLog.mBrandName = Convert.ToString(dr["BrandName"].ToString());
                        ObjCVarRepvwWH_ProductLog.mProductType = Convert.ToString(dr["ProductType"].ToString());
                        ObjCVarRepvwWH_ProductLog.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarRepvwWH_ProductLog.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarRepvwWH_ProductLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarRepvwWH_ProductLog.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra1 = Convert.ToString(dr["Extra1"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra2 = Convert.ToString(dr["Extra2"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra3 = Convert.ToString(dr["Extra3"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra4 = Convert.ToString(dr["Extra4"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra5 = Convert.ToString(dr["Extra5"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra6 = Convert.ToString(dr["Extra6"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra7 = Convert.ToString(dr["Extra7"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra8 = Convert.ToString(dr["Extra8"].ToString());
                        ObjCVarRepvwWH_ProductLog.mExtra9 = Convert.ToString(dr["Extra9"].ToString());
                        ObjCVarRepvwWH_ProductLog.mIsDefected = Convert.ToBoolean(dr["IsDefected"].ToString());
                        lstCVarRepvwWH_ProductLog.Add(ObjCVarRepvwWH_ProductLog);
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