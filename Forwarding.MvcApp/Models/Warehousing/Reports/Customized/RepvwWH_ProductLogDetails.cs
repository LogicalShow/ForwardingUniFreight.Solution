using System;
using System.Collections.Generic;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Customized
{
    [Serializable]
    public partial class CVarRepvwWH_ProductLogDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPurchaseItemID;
        internal String mPurchaseItemName;
        internal Decimal mReceiptQty;
        internal Decimal mReceiptWeight;
        internal Decimal mReceiptVolume;
        internal String mPurchaseItemCode;
        internal Decimal mDispatchQty;
        internal Decimal mDispatchWeight;
        internal Decimal mDispatchVolume;
        internal String mPartNumber;
        internal String mNotes;
        internal String mPalletID;
        internal DateTime mCreationDate;
        internal String mBrandName;
        internal DateTime mFinalizeDate;
        internal String mCode;
        internal String mPackageTypeName;
        internal String mDetailFile;
        internal String mDetailInvoice;
        internal String mContainerNumber;
        internal String mPickupNotes;
		internal Boolean mIsDefected;
		#endregion

		#region "Methods"
		public Int32 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public String PurchaseItemName
        {
            get { return mPurchaseItemName; }
            set { mPurchaseItemName = value; }
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
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String BrandName
        {
            get { return mBrandName; }
            set { mBrandName = value; }
        }
        public String PalletID
        {
            get { return mPalletID; }
            set { mPalletID = value; }
        }

        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public DateTime FinalizeDate
        {
            get { return mFinalizeDate; }
            set { mFinalizeDate = value; }
        }
        public string Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public string PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public string DetailFile
        {
            get { return mDetailFile; }
            set { mDetailFile = value; }
        }
        public string DetailInvoice
        {
            get { return mDetailInvoice; }
            set { mDetailInvoice = value; }
        }
        public string ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public string PickupNotes
        {
            get { return mPickupNotes; }
            set { mPickupNotes = value; }
        }
		public Boolean IsDefected
		{
			get { return mIsDefected; }
			set { mIsDefected = value; }
		}
		#endregion
	}

    public partial class CRepvwWH_ProductLogDetails
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
        public List<CVarRepvwWH_ProductLogDetails> lstCVarRepvwWH_ProductLogDetails = new List<CVarRepvwWH_ProductLogDetails>();
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
            lstCVarRepvwWH_ProductLogDetails.Clear();

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

                    Com.CommandText = "[dbo].RepvwWH_ProductLogDetails";
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
                        CVarRepvwWH_ProductLogDetails ObjCVarRepvwWH_ProductLogDetails = new CVarRepvwWH_ProductLogDetails();
                        ObjCVarRepvwWH_ProductLogDetails.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mReceiptQty = Convert.ToDecimal(dr["ReceiptQuantity"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mReceiptWeight = Convert.ToDecimal(dr["ReceiptWeight"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mReceiptVolume = Convert.ToDecimal(dr["ReceiptVolume"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mDispatchQty = Convert.ToDecimal(dr["DispatchQuantity"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mDispatchWeight = Convert.ToDecimal(dr["DispatchWeight"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mDispatchVolume = Convert.ToDecimal(dr["DispatchVolume"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mBrandName = Convert.ToString(dr["BrandName"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mFinalizeDate = Convert.ToDateTime(dr["FinalizeDate"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mDetailFile = Convert.ToString(dr["DetailFile"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mDetailInvoice = Convert.ToString(dr["DetailInvoice"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarRepvwWH_ProductLogDetails.mPickupNotes = Convert.ToString(dr["PickupNotes"].ToString());
						ObjCVarRepvwWH_ProductLogDetails.mIsDefected = Convert.ToBoolean(dr["IsDefected"].ToString());

						lstCVarRepvwWH_ProductLogDetails.Add(ObjCVarRepvwWH_ProductLogDetails);
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