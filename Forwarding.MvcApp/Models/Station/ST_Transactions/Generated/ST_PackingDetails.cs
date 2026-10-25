using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKST_PackingDetails
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
    public partial class CVarST_PackingDetails : CPKST_PackingDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
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
        //----------------------------------------------------- ADD Manual 
        internal String mCustomerName;
        internal String mVarietyName;
        internal String mCommodityName;
        internal String mBoogingNumber;
        #endregion

        #region "Methods"
        public Int32 ST_PackingID
        {
            get { return mST_PackingID; }
            set { mIsChanges = true; mST_PackingID = value; }
        }
        public String Exporter
        {
            get { return mExporter; }
            set { mIsChanges = true; mExporter = value; }
        }
        public String Country
        {
            get { return mCountry; }
            set { mIsChanges = true; mCountry = value; }
        }
        public Int32 ContainerID
        {
            get { return mContainerID; }
            set { mIsChanges = true; mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mIsChanges = true; mContainerNumber = value; }
        }
        public Int32 PalletRefNumber
        {
            get { return mPalletRefNumber; }
            set { mIsChanges = true; mPalletRefNumber = value; }
        }
        public Boolean MixedPallet
        {
            get { return mMixedPallet; }
            set { mIsChanges = true; mMixedPallet = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 VarietyID
        {
            get { return mVarietyID; }
            set { mIsChanges = true; mVarietyID = value; }
        }
        public String PackType
        {
            get { return mPackType; }
            set { mIsChanges = true; mPackType = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Decimal QuantityBoxes
        {
            get { return mQuantityBoxes; }
            set { mIsChanges = true; mQuantityBoxes = value; }
        }
        public String Size
        {
            get { return mSize; }
            set { mIsChanges = true; mSize = value; }
        }

        public String Class
        {
            get { return mClass; }
            set { mIsChanges = true; mClass = value; }
        }
        public Boolean ClassAB
        {
            get { return mClassAB; }
            set { mIsChanges = true; mClassAB = value; }
        }
        public Boolean OrNot
        {
            get { return mOrNot; }
            set { mIsChanges = true; mOrNot = value; }
        }
        public Int32 GateInDetailsID
        {
            get { return mGateInDetailsID; }
            set { mIsChanges = true; mGateInDetailsID = value; }
        }
        public Int32 PreGateInDetailsID
        {
            get { return mPreGateInDetailsID; }
            set { mIsChanges = true; mPreGateInDetailsID = value; }
        }
        public Decimal ExtraSize
        {
            get { return mExtraSize; }
            set { mIsChanges = true; mExtraSize = value; }
        }
        public Int32 NumOfPallet
        {
            get { return mNumOfPallet; }
            set { mIsChanges = true; mNumOfPallet = value; }
        }
        public Int32 NumOfAngles
        {
            get { return mNumOfAngles; }
            set { mIsChanges = true; mNumOfAngles = value; }
        }
        public Int32 BakrChamber
        {
            get { return mBakrChamber; }
            set { mIsChanges = true; mBakrChamber = value; }
        }
        public Int32 ClipsChamber
        {
            get { return mClipsChamber; }
            set { mIsChanges = true; mClipsChamber = value; }
        }
        public Int32 PalletCover
        {
            get { return mPalletCover; }
            set { mIsChanges = true; mPalletCover = value; }
        }
        public Int32 TotalSize
        {
            get { return mTotalSize; }
            set { mIsChanges = true; mTotalSize = value; }
        }
        public Decimal TotalExtraSize
        {
            get { return mTotalExtraSize; }
            set { mIsChanges = true; mTotalExtraSize = value; }
        }

        //----------------------------------------------------- ADD Manual 
   
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mIsChanges = true; mCustomerName = value; }
        }
         public String VarietyName
        {
            get { return mVarietyName; }
            set { mIsChanges = true; mVarietyName = value; }
        }
         public String CommodityName
        {
            get { return mCommodityName; }
            set { mIsChanges = true; mCommodityName = value; }
        }
        public String BoogingNumber
        {
            get { return mBoogingNumber; }
            set { mIsChanges = true; mBoogingNumber = value; }
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

    public partial class CST_PackingDetails
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
        public List<CVarST_PackingDetails> lstCVarST_PackingDetails = new List<CVarST_PackingDetails>();
        public List<CPKST_PackingDetails> lstDeletedCPKST_PackingDetails = new List<CPKST_PackingDetails>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarST_PackingDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListST_PackingDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_PackingDetails";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarST_PackingDetails ObjCVarST_PackingDetails = new CVarST_PackingDetails();
                        ObjCVarST_PackingDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_PackingDetails.mST_PackingID = Convert.ToInt32(dr["ST_PackingID"].ToString());
                        ObjCVarST_PackingDetails.mExporter = Convert.ToString(dr["Exporter"].ToString());
                        ObjCVarST_PackingDetails.mCountry = Convert.ToString(dr["Country"].ToString());
                        ObjCVarST_PackingDetails.mContainerID = Convert.ToInt32(dr["ContainerID"].ToString());
                        ObjCVarST_PackingDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_PackingDetails.mPalletRefNumber = Convert.ToInt32(dr["PalletRefNumber"].ToString());
                        ObjCVarST_PackingDetails.mMixedPallet = Convert.ToBoolean(dr["MixedPallet"].ToString());
                        ObjCVarST_PackingDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarST_PackingDetails.mVarietyID = Convert.ToInt32(dr["VarietyID"].ToString());
                        ObjCVarST_PackingDetails.mPackType = Convert.ToString(dr["PackType"].ToString());
                        ObjCVarST_PackingDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarST_PackingDetails.mQuantityBoxes = Convert.ToDecimal(dr["QuantityBoxes"].ToString());
                        ObjCVarST_PackingDetails.mSize = Convert.ToString(dr["Size"].ToString());
                        ObjCVarST_PackingDetails.mClass = Convert.ToString(dr["lass"].ToString());
                        ObjCVarST_PackingDetails.mClassAB = Convert.ToBoolean(dr["ClassAB"].ToString());
                        ObjCVarST_PackingDetails.mOrNot = Convert.ToBoolean(dr["OrNot"].ToString());
                        ObjCVarST_PackingDetails.mGateInDetailsID = Convert.ToInt32(dr["GateInDetailsID"].ToString());
                        ObjCVarST_PackingDetails.mPreGateInDetailsID = Convert.ToInt32(dr["PreGateInDetailsID"].ToString());
                        ObjCVarST_PackingDetails.mExtraSize = Convert.ToDecimal(dr["ExtraSize"].ToString());
                        ObjCVarST_PackingDetails.mNumOfPallet = Convert.ToInt32(dr["NumOfPallet"].ToString());
                        ObjCVarST_PackingDetails.mNumOfAngles = Convert.ToInt32(dr["NumOfAngles"].ToString());
                        ObjCVarST_PackingDetails.mBakrChamber = Convert.ToInt32(dr["BakrChamber"].ToString());
                        ObjCVarST_PackingDetails.mClipsChamber = Convert.ToInt32(dr["ClipsChamber"].ToString());
                        ObjCVarST_PackingDetails.mPalletCover = Convert.ToInt32(dr["PalletCover"].ToString());
                        ObjCVarST_PackingDetails.mTotalSize = Convert.ToInt32(dr["TotalSize"].ToString());
                        ObjCVarST_PackingDetails.mTotalExtraSize = Convert.ToDecimal(dr["TotalExtraSize"].ToString());
                        ObjCVarST_PackingDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarST_PackingDetails.mVarietyName = Convert.ToString(dr["VarietyName"].ToString());
                        ObjCVarST_PackingDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarST_PackingDetails.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                      

                        lstCVarST_PackingDetails.Add(ObjCVarST_PackingDetails);
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
            lstCVarST_PackingDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_PackingDetails";
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
                        CVarST_PackingDetails ObjCVarST_PackingDetails = new CVarST_PackingDetails();
                        ObjCVarST_PackingDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_PackingDetails.mST_PackingID = Convert.ToInt32(dr["ST_PackingID"].ToString());
                        ObjCVarST_PackingDetails.mExporter = Convert.ToString(dr["Exporter"].ToString());
                        ObjCVarST_PackingDetails.mCountry = Convert.ToString(dr["Country"].ToString());
                        ObjCVarST_PackingDetails.mContainerID = Convert.ToInt32(dr["ContainerID"].ToString());
                        ObjCVarST_PackingDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_PackingDetails.mPalletRefNumber = Convert.ToInt32(dr["PalletRefNumber"].ToString());
                        ObjCVarST_PackingDetails.mMixedPallet = Convert.ToBoolean(dr["MixedPallet"].ToString());
                        ObjCVarST_PackingDetails.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarST_PackingDetails.mVarietyID = Convert.ToInt32(dr["VarietyID"].ToString());
                        ObjCVarST_PackingDetails.mPackType = Convert.ToString(dr["PackType"].ToString());
                        ObjCVarST_PackingDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarST_PackingDetails.mQuantityBoxes = Convert.ToDecimal(dr["QuantityBoxes"].ToString());
                        ObjCVarST_PackingDetails.mSize = Convert.ToString(dr["Size"].ToString());
                        ObjCVarST_PackingDetails.mClass = Convert.ToString(dr["Class"].ToString());
                        ObjCVarST_PackingDetails.mClassAB = Convert.ToBoolean(dr["ClassAB"].ToString());
                        ObjCVarST_PackingDetails.mOrNot = Convert.ToBoolean(dr["OrNot"].ToString());
                        ObjCVarST_PackingDetails.mGateInDetailsID = Convert.ToInt32(dr["GateInDetailsID"].ToString());
                        ObjCVarST_PackingDetails.mPreGateInDetailsID = Convert.ToInt32(dr["PreGateInDetailsID"].ToString());
                        ObjCVarST_PackingDetails.mExtraSize = Convert.ToDecimal(dr["ExtraSize"].ToString());
                        ObjCVarST_PackingDetails.mNumOfPallet = Convert.ToInt32(dr["NumOfPallet"].ToString());
                        ObjCVarST_PackingDetails.mNumOfAngles = Convert.ToInt32(dr["NumOfAngles"].ToString());
                        ObjCVarST_PackingDetails.mBakrChamber = Convert.ToInt32(dr["BakrChamber"].ToString());
                        ObjCVarST_PackingDetails.mClipsChamber = Convert.ToInt32(dr["ClipsChamber"].ToString());
                        ObjCVarST_PackingDetails.mPalletCover = Convert.ToInt32(dr["PalletCover"].ToString());
                        ObjCVarST_PackingDetails.mTotalSize = Convert.ToInt32(dr["TotalSize"].ToString());
                        ObjCVarST_PackingDetails.mTotalExtraSize = Convert.ToDecimal(dr["TotalExtraSize"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_PackingDetails.Add(ObjCVarST_PackingDetails);
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


        
        public Exception TotalGetListST_PackingDetails(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarST_PackingDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].TotalGetListST_PackingDetails";
                    Com.Parameters[0].Value = Param;
            
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarST_PackingDetails ObjCVarST_PackingDetails = new CVarST_PackingDetails();
                      
                      
                        ObjCVarST_PackingDetails.mQuantityBoxes = Convert.ToDecimal(dr["QuantityBoxes"].ToString());
                        ObjCVarST_PackingDetails.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarST_PackingDetails.mSize = Convert.ToString(dr["Size"].ToString());
                        ObjCVarST_PackingDetails.mPackType = Convert.ToString(dr["PackType"].ToString());
                        ObjCVarST_PackingDetails.mVarietyName = Convert.ToString(dr["VarietyName"].ToString());
                        ObjCVarST_PackingDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
            
                        

                        lstCVarST_PackingDetails.Add(ObjCVarST_PackingDetails);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListST_PackingDetails";
                else
                    Com.CommandText = "[dbo].UpdateListST_PackingDetails";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKST_PackingDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_PackingDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKST_PackingDetails ObjCPKST_PackingDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_PackingDetails.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarST_PackingDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ST_PackingID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Exporter", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Country", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ContainerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PalletRefNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MixedPallet", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VarietyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@QuantityBoxes", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Size", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Class", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClassAB", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@OrNot", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@GateInDetailsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PreGateInDetailsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExtraSize", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NumOfPallet", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NumOfAngles", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BakrChamber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ClipsChamber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PalletCover", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalExtraSize", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_PackingDetails ObjCVarST_PackingDetails in SaveList)
                {
                    if (ObjCVarST_PackingDetails.mIsChanges == true)
                    {
                        if (ObjCVarST_PackingDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_PackingDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_PackingDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_PackingDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_PackingDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_PackingDetails.ID;
                        }
                        Com.Parameters["@ST_PackingID"].Value = ObjCVarST_PackingDetails.ST_PackingID;
                        Com.Parameters["@Exporter"].Value = ObjCVarST_PackingDetails.Exporter;
                        Com.Parameters["@Country"].Value = ObjCVarST_PackingDetails.Country;
                        Com.Parameters["@ContainerID"].Value = ObjCVarST_PackingDetails.ContainerID;
                        Com.Parameters["@ContainerNumber"].Value = ObjCVarST_PackingDetails.ContainerNumber;
                        Com.Parameters["@PalletRefNumber"].Value = ObjCVarST_PackingDetails.PalletRefNumber;
                        Com.Parameters["@MixedPallet"].Value = ObjCVarST_PackingDetails.MixedPallet;
                        Com.Parameters["@CommodityID"].Value = ObjCVarST_PackingDetails.CommodityID;
                        Com.Parameters["@VarietyID"].Value = ObjCVarST_PackingDetails.VarietyID;
                        Com.Parameters["@PackType"].Value = ObjCVarST_PackingDetails.PackType;
                        Com.Parameters["@CustomerID"].Value = ObjCVarST_PackingDetails.CustomerID;
                        Com.Parameters["@QuantityBoxes"].Value = ObjCVarST_PackingDetails.QuantityBoxes;
                        Com.Parameters["@Size"].Value = ObjCVarST_PackingDetails.Size;
                        Com.Parameters["@Class"].Value = ObjCVarST_PackingDetails.Class;
                        Com.Parameters["@ClassAB"].Value = ObjCVarST_PackingDetails.ClassAB;
                        Com.Parameters["@OrNot"].Value = ObjCVarST_PackingDetails.OrNot;
                        Com.Parameters["@GateInDetailsID"].Value = ObjCVarST_PackingDetails.GateInDetailsID;
                        Com.Parameters["@PreGateInDetailsID"].Value = ObjCVarST_PackingDetails.PreGateInDetailsID;
                        Com.Parameters["@ExtraSize"].Value = ObjCVarST_PackingDetails.ExtraSize;
                        Com.Parameters["@NumOfPallet"].Value = ObjCVarST_PackingDetails.NumOfPallet;
                        Com.Parameters["@NumOfAngles"].Value = ObjCVarST_PackingDetails.NumOfAngles;
                        Com.Parameters["@BakrChamber"].Value = ObjCVarST_PackingDetails.BakrChamber;
                        Com.Parameters["@ClipsChamber"].Value = ObjCVarST_PackingDetails.ClipsChamber;
                        Com.Parameters["@PalletCover"].Value = ObjCVarST_PackingDetails.PalletCover;
                        Com.Parameters["@TotalSize"].Value = ObjCVarST_PackingDetails.TotalSize;
                        Com.Parameters["@TotalExtraSize"].Value = ObjCVarST_PackingDetails.TotalExtraSize;
                        EndTrans(Com, Con);
                        if (ObjCVarST_PackingDetails.ID == 0)
                        {
                            ObjCVarST_PackingDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_PackingDetails.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}
