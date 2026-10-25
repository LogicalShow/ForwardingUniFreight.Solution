using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public partial class CVarvwST_PackingDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mST_PackingID;
        internal String mExporter;
        internal String mCountry;
        internal Int32 mContainerID;
        internal String mContainerNumber;
        internal Int32 mPalletRefNumber;
        internal Boolean mMixedPallet;
        internal Int32 mCommodityID;
        internal Int32 mVarietyID;
        internal String mPackType;
        internal Int32 mCustomerID;
        internal Decimal mQuantityBoxes;
        internal String mSize;
        internal String mClass;
        internal Boolean mClassAB;
        internal Boolean mOrNot;
        internal Int32 mGateInDetailsID;
        internal Int32 mPreGateInDetailsID;
        internal Decimal mExtraSize;
        internal Int32 mNumOfPallet;
        internal Int32 mNumOfAngles;
        internal Int32 mBakrChamber;
        internal Int32 mClipsChamber;
        internal Int32 mPalletCover;
        internal Int32 mTotalSize;
        internal Decimal mTotalExtraSize;
        internal String mBoogingNumber;
        internal DateTime mEntryDate;
        internal String mCustomerName;
        internal String mVarietyName;
        internal String mCommodityName;
        internal String mLot;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 ST_PackingID
        {
            get { return mST_PackingID; }
            set { mST_PackingID = value; }
        }
        public String Exporter
        {
            get { return mExporter; }
            set { mExporter = value; }
        }
        public String Country
        {
            get { return mCountry; }
            set { mCountry = value; }
        }
        public Int32 ContainerID
        {
            get { return mContainerID; }
            set { mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public Int32 PalletRefNumber
        {
            get { return mPalletRefNumber; }
            set { mPalletRefNumber = value; }
        }
        public Boolean MixedPallet
        {
            get { return mMixedPallet; }
            set { mMixedPallet = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mCommodityID = value; }
        }
        public Int32 VarietyID
        {
            get { return mVarietyID; }
            set { mVarietyID = value; }
        }
        public String PackType
        {
            get { return mPackType; }
            set { mPackType = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Decimal QuantityBoxes
        {
            get { return mQuantityBoxes; }
            set { mQuantityBoxes = value; }
        }
        public String Size
        {
            get { return mSize; }
            set { mSize = value; }
        }

        public String Class
        {
            get { return mClass; }
            set { mClass = value; }
        }
        public Boolean ClassAB
        {
            get { return mClassAB; }
            set { mClassAB = value; }
        }
        public Boolean OrNot
        {
            get { return mOrNot; }
            set { mOrNot = value; }
        }
        public Int32 GateInDetailsID
        {
            get { return mGateInDetailsID; }
            set { mGateInDetailsID = value; }
        }
        public Int32 PreGateInDetailsID
        {
            get { return mPreGateInDetailsID; }
            set { mPreGateInDetailsID = value; }
        }
        public Decimal ExtraSize
        {
            get { return mExtraSize; }
            set { mExtraSize = value; }
        }
        public Int32 NumOfPallet
        {
            get { return mNumOfPallet; }
            set { mNumOfPallet = value; }
        }
        public Int32 NumOfAngles
        {
            get { return mNumOfAngles; }
            set { mNumOfAngles = value; }
        }
        public Int32 BakrChamber
        {
            get { return mBakrChamber; }
            set { mBakrChamber = value; }
        }
        public Int32 ClipsChamber
        {
            get { return mClipsChamber; }
            set { mClipsChamber = value; }
        }
        public Int32 PalletCover
        {
            get { return mPalletCover; }
            set { mPalletCover = value; }
        }
        public Int32 TotalSize
        {
            get { return mTotalSize; }
            set { mTotalSize = value; }
        }
        public Decimal TotalExtraSize
        {
            get { return mTotalExtraSize; }
            set { mTotalExtraSize = value; }
        }
        public String BoogingNumber
        {
            get { return mBoogingNumber; }
            set { mBoogingNumber = value; }
        }
        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mEntryDate = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public String VarietyName
        {
            get { return mVarietyName; }
            set { mVarietyName = value; }
        }
        public String CommodityName
        {
            get { return mCommodityName; }
            set { mCommodityName = value; }
        }
        public String Lot
        {
            get { return mLot; }
            set { mLot = value; }
        }
        #endregion
    }

    public partial class CvwST_PackingDetails
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
        public List<CVarvwST_PackingDetails> lstCVarvwST_PackingDetails = new List<CVarvwST_PackingDetails>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwST_PackingDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwST_PackingDetails";
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
                        CVarvwST_PackingDetails ObjCVarvwST_PackingDetails = new CVarvwST_PackingDetails();
                        ObjCVarvwST_PackingDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwST_PackingDetails.mST_PackingID = Convert.ToInt32(dr["ST_PackingID"].ToString());
                        ObjCVarvwST_PackingDetails.mExporter = Convert.ToString(dr["Exporter"].ToString());
                        ObjCVarvwST_PackingDetails.mCountry = Convert.ToString(dr["Country"].ToString());
                        ObjCVarvwST_PackingDetails.mContainerID = Convert.ToInt32(dr["ContainerID"].ToString());
                        ObjCVarvwST_PackingDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_PackingDetails.mPalletRefNumber = Convert.ToInt32(dr["PalletRefNumber"].ToString());
                        ObjCVarvwST_PackingDetails.mMixedPallet = Convert.ToBoolean(dr["MixedPallet"].ToString());
                        ObjCVarvwST_PackingDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwST_PackingDetails.mVarietyID = Convert.ToInt32(dr["VarietyID"].ToString());
                        ObjCVarvwST_PackingDetails.mPackType = Convert.ToString(dr["PackType"].ToString());
                        ObjCVarvwST_PackingDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_PackingDetails.mQuantityBoxes = Convert.ToDecimal(dr["QuantityBoxes"].ToString());
                        ObjCVarvwST_PackingDetails.mSize = Convert.ToString(dr["Size"].ToString());
                        ObjCVarvwST_PackingDetails.mClass = Convert.ToString(dr["Class"].ToString());
                        ObjCVarvwST_PackingDetails.mClassAB = Convert.ToBoolean(dr["ClassAB"].ToString());
                        ObjCVarvwST_PackingDetails.mOrNot = Convert.ToBoolean(dr["OrNot"].ToString());
                        ObjCVarvwST_PackingDetails.mGateInDetailsID = Convert.ToInt32(dr["GateInDetailsID"].ToString());
                        ObjCVarvwST_PackingDetails.mPreGateInDetailsID = Convert.ToInt32(dr["PreGateInDetailsID"].ToString());
                        ObjCVarvwST_PackingDetails.mExtraSize = Convert.ToDecimal(dr["ExtraSize"].ToString());
                        ObjCVarvwST_PackingDetails.mNumOfPallet = Convert.ToInt32(dr["NumOfPallet"].ToString());
                        ObjCVarvwST_PackingDetails.mNumOfAngles = Convert.ToInt32(dr["NumOfAngles"].ToString());
                        ObjCVarvwST_PackingDetails.mBakrChamber = Convert.ToInt32(dr["BakrChamber"].ToString());
                        ObjCVarvwST_PackingDetails.mClipsChamber = Convert.ToInt32(dr["ClipsChamber"].ToString());
                        ObjCVarvwST_PackingDetails.mPalletCover = Convert.ToInt32(dr["PalletCover"].ToString());
                        ObjCVarvwST_PackingDetails.mTotalSize = Convert.ToInt32(dr["TotalSize"].ToString());
                        ObjCVarvwST_PackingDetails.mTotalExtraSize = Convert.ToDecimal(dr["TotalExtraSize"].ToString());
                        ObjCVarvwST_PackingDetails.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                        ObjCVarvwST_PackingDetails.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwST_PackingDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwST_PackingDetails.mVarietyName = Convert.ToString(dr["VarietyName"].ToString());
                        ObjCVarvwST_PackingDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwST_PackingDetails.mLot = Convert.ToString(dr["Lot"].ToString());
                        lstCVarvwST_PackingDetails.Add(ObjCVarvwST_PackingDetails);
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

        public Exception TotalGetListvwST_PackingDetails(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwST_PackingDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.CommandText = "[dbo].TotalGetListvwST_PackingDetails";
                Com.Parameters[0].Value = Param;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwST_PackingDetails ObjCVarvwST_PackingDetails = new CVarvwST_PackingDetails();


                        ObjCVarvwST_PackingDetails.mQuantityBoxes = Convert.ToDecimal(dr["QuantityBoxes"].ToString());
                        ObjCVarvwST_PackingDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwST_PackingDetails.mSize = Convert.ToString(dr["Size"].ToString());
                        ObjCVarvwST_PackingDetails.mPackType = Convert.ToString(dr["PackType"].ToString());
                        ObjCVarvwST_PackingDetails.mVarietyName = Convert.ToString(dr["VarietyName"].ToString());
                        ObjCVarvwST_PackingDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwST_PackingDetails.mLot = Convert.ToString(dr["Lot"].ToString());



                        lstCVarvwST_PackingDetails.Add(ObjCVarvwST_PackingDetails);
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
