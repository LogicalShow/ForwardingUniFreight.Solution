using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated
{


    [Serializable]
    public class CPKvwClientsYardLinkTank
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
    public partial class CVarvwClientsYardLinkTank : CPKvwClientsYardLinkTank
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mEnName;
        internal String mArName;
        internal Boolean mActiveCustomer;
        internal Boolean mIsLine;
        internal String mColor;
        internal Int32 mCountryID;
        internal String mCityName;
        internal String mAddressInfo;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile;
        internal String mFax;
        internal String mEMail;
        internal String mWebSite;
        internal String mPrintedData;
        internal String mContactPerson;
        internal String mContactPersonDetail;
        internal String mExternalCode;
        internal Int32 mStorageFullTariffID;
        internal Int32 mStorageEmptyTariffID;
        internal Byte mPaymentTypeID;
        internal Boolean mReqBillNo;
        internal Int32 mPortShuttlingTRFID;
        internal String mRemarks;
        internal Boolean mIn;
        internal Boolean mOut;
        internal Int32 mServiceTariffID;
        internal Boolean mLeftOff;
        internal Int32 mblockSizeIn;
        internal Int32 mblockSizeOut;
        internal Int32 mGnstTariffId;
        internal Int32 mSrvcCustId;
        internal String mTaxNumber;
        internal String mEnteredFrom;
        internal String mlocalAgent;
        internal String mLAAddressInfo;
        internal String mLAPhone1;
        internal String mLAPhone2;
        internal String mLAMobile;
        internal String mLAFax;
        internal String mLAEMail;
        internal String mLAWebSite;
        internal Int32 mCustomerCategoryID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public String ArName
        {
            get { return mArName; }
            set { mArName = value; }
        }
        public Boolean ActiveCustomer
        {
            get { return mActiveCustomer; }
            set { mActiveCustomer = value; }
        }
        public Boolean IsLine
        {
            get { return mIsLine; }
            set { mIsLine = value; }
        }
        public String Color
        {
            get { return mColor; }
            set { mColor = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
        }
        public String CityName
        {
            get { return mCityName; }
            set { mCityName = value; }
        }
        public String AddressInfo
        {
            get { return mAddressInfo; }
            set { mAddressInfo = value; }
        }
        public String Phone1
        {
            get { return mPhone1; }
            set { mPhone1 = value; }
        }
        public String Phone2
        {
            get { return mPhone2; }
            set { mPhone2 = value; }
        }
        public String Mobile
        {
            get { return mMobile; }
            set { mMobile = value; }
        }
        public String Fax
        {
            get { return mFax; }
            set { mFax = value; }
        }
        public String EMail
        {
            get { return mEMail; }
            set { mEMail = value; }
        }
        public String WebSite
        {
            get { return mWebSite; }
            set { mWebSite = value; }
        }
        public String PrintedData
        {
            get { return mPrintedData; }
            set { mPrintedData = value; }
        }
        public String ContactPerson
        {
            get { return mContactPerson; }
            set { mContactPerson = value; }
        }
        public String ContactPersonDetail
        {
            get { return mContactPersonDetail; }
            set { mContactPersonDetail = value; }
        }
        public String ExternalCode
        {
            get { return mExternalCode; }
            set { mExternalCode = value; }
        }
        public Int32 StorageFullTariffID
        {
            get { return mStorageFullTariffID; }
            set { mStorageFullTariffID = value; }
        }
        public Int32 StorageEmptyTariffID
        {
            get { return mStorageEmptyTariffID; }
            set { mStorageEmptyTariffID = value; }
        }
        public Byte PaymentTypeID
        {
            get { return mPaymentTypeID; }
            set { mPaymentTypeID = value; }
        }
        public Boolean ReqBillNo
        {
            get { return mReqBillNo; }
            set { mReqBillNo = value; }
        }
        public Int32 PortShuttlingTRFID
        {
            get { return mPortShuttlingTRFID; }
            set { mPortShuttlingTRFID = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Boolean In
        {
            get { return mIn; }
            set { mIn = value; }
        }
        public Boolean Out
        {
            get { return mOut; }
            set { mOut = value; }
        }
        public Int32 ServiceTariffID
        {
            get { return mServiceTariffID; }
            set { mServiceTariffID = value; }
        }
        public Boolean LeftOff
        {
            get { return mLeftOff; }
            set { mLeftOff = value; }
        }
        public Int32 blockSizeIn
        {
            get { return mblockSizeIn; }
            set { mblockSizeIn = value; }
        }
        public Int32 blockSizeOut
        {
            get { return mblockSizeOut; }
            set { mblockSizeOut = value; }
        }
        public Int32 GnstTariffId
        {
            get { return mGnstTariffId; }
            set { mGnstTariffId = value; }
        }
        public Int32 SrvcCustId
        {
            get { return mSrvcCustId; }
            set { mSrvcCustId = value; }
        }
        public String TaxNumber
        {
            get { return mTaxNumber; }
            set { mTaxNumber = value; }
        }
        public String EnteredFrom
        {
            get { return mEnteredFrom; }
            set { mEnteredFrom = value; }
        }
        public String localAgent
        {
            get { return mlocalAgent; }
            set { mlocalAgent = value; }
        }
        public String LAAddressInfo
        {
            get { return mLAAddressInfo; }
            set { mLAAddressInfo = value; }
        }
        public String LAPhone1
        {
            get { return mLAPhone1; }
            set { mLAPhone1 = value; }
        }
        public String LAPhone2
        {
            get { return mLAPhone2; }
            set { mLAPhone2 = value; }
        }
        public String LAMobile
        {
            get { return mLAMobile; }
            set { mLAMobile = value; }
        }
        public String LAFax
        {
            get { return mLAFax; }
            set { mLAFax = value; }
        }
        public String LAEMail
        {
            get { return mLAEMail; }
            set { mLAEMail = value; }
        }
        public String LAWebSite
        {
            get { return mLAWebSite; }
            set { mLAWebSite = value; }
        }
        public Int32 CustomerCategoryID
        {
            get { return mCustomerCategoryID; }
            set { mCustomerCategoryID = value; }
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

    public partial class CvwClientsYardLinkTank
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
        public List<CVarvwClientsYardLinkTank> lstCVarvwClientsYardLinkTank = new List<CVarvwClientsYardLinkTank>();
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
            lstCVarvwClientsYardLinkTank.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwClientsYardLinkTank";
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
                        CVarvwClientsYardLinkTank ObjCVarvwClientsYardLinkTank = new CVarvwClientsYardLinkTank();
                        ObjCVarvwClientsYardLinkTank.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mArName = Convert.ToString(dr["ArName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mActiveCustomer = Convert.ToBoolean(dr["ActiveCustomer"].ToString());
                        ObjCVarvwClientsYardLinkTank.mIsLine = Convert.ToBoolean(dr["IsLine"].ToString());
                        ObjCVarvwClientsYardLinkTank.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mAddressInfo = Convert.ToString(dr["AddressInfo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwClientsYardLinkTank.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwClientsYardLinkTank.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEMail = Convert.ToString(dr["EMail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mWebSite = Convert.ToString(dr["WebSite"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPrintedData = Convert.ToString(dr["PrintedData"].ToString());
                        ObjCVarvwClientsYardLinkTank.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwClientsYardLinkTank.mContactPersonDetail = Convert.ToString(dr["ContactPersonDetail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mExternalCode = Convert.ToString(dr["ExternalCode"].ToString());
                        ObjCVarvwClientsYardLinkTank.mStorageFullTariffID = Convert.ToInt32(dr["StorageFullTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mStorageEmptyTariffID = Convert.ToInt32(dr["StorageEmptyTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPaymentTypeID = Convert.ToByte(dr["PaymentTypeID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mReqBillNo = Convert.ToBoolean(dr["ReqBillNo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPortShuttlingTRFID = Convert.ToInt32(dr["PortShuttlingTRFID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        //ObjCVarvwClientsYardLinkTank.mIn = Convert.ToBoolean(dr["In"].ToString());
                        ObjCVarvwClientsYardLinkTank.mOut = Convert.ToBoolean(dr["Out"].ToString());
                        ObjCVarvwClientsYardLinkTank.mServiceTariffID = Convert.ToInt32(dr["ServiceTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLeftOff = Convert.ToBoolean(dr["LeftOff"].ToString());
                        ObjCVarvwClientsYardLinkTank.mblockSizeIn = Convert.ToInt32(dr["blockSizeIn"].ToString());
                        ObjCVarvwClientsYardLinkTank.mblockSizeOut = Convert.ToInt32(dr["blockSizeOut"].ToString());
                        ObjCVarvwClientsYardLinkTank.mGnstTariffId = Convert.ToInt32(dr["GnstTariffId"].ToString());
                        ObjCVarvwClientsYardLinkTank.mSrvcCustId = Convert.ToInt32(dr["SrvcCustId"].ToString());
                        ObjCVarvwClientsYardLinkTank.mTaxNumber = Convert.ToString(dr["TaxNumber"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEnteredFrom = Convert.ToString(dr["EnteredFrom"].ToString());
                        ObjCVarvwClientsYardLinkTank.mlocalAgent = Convert.ToString(dr["localAgent"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAAddressInfo = Convert.ToString(dr["LAAddressInfo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAPhone1 = Convert.ToString(dr["LAPhone1"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAPhone2 = Convert.ToString(dr["LAPhone2"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAMobile = Convert.ToString(dr["LAMobile"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAFax = Convert.ToString(dr["LAFax"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAEMail = Convert.ToString(dr["LAEMail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAWebSite = Convert.ToString(dr["LAWebSite"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCustomerCategoryID = Convert.ToInt32(dr["CustomerCategoryID"].ToString());
                        lstCVarvwClientsYardLinkTank.Add(ObjCVarvwClientsYardLinkTank);
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
            lstCVarvwClientsYardLinkTank.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwClientsYardLinkTank";
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
                        CVarvwClientsYardLinkTank ObjCVarvwClientsYardLinkTank = new CVarvwClientsYardLinkTank();
                        ObjCVarvwClientsYardLinkTank.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mArName = Convert.ToString(dr["ArName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mActiveCustomer = Convert.ToBoolean(dr["ActiveCustomer"].ToString());
                        ObjCVarvwClientsYardLinkTank.mIsLine = Convert.ToBoolean(dr["IsLine"].ToString());
                        ObjCVarvwClientsYardLinkTank.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwClientsYardLinkTank.mAddressInfo = Convert.ToString(dr["AddressInfo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwClientsYardLinkTank.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwClientsYardLinkTank.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEMail = Convert.ToString(dr["EMail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mWebSite = Convert.ToString(dr["WebSite"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPrintedData = Convert.ToString(dr["PrintedData"].ToString());
                        ObjCVarvwClientsYardLinkTank.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwClientsYardLinkTank.mContactPersonDetail = Convert.ToString(dr["ContactPersonDetail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mExternalCode = Convert.ToString(dr["ExternalCode"].ToString());
                        ObjCVarvwClientsYardLinkTank.mStorageFullTariffID = Convert.ToInt32(dr["StorageFullTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mStorageEmptyTariffID = Convert.ToInt32(dr["StorageEmptyTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPaymentTypeID = Convert.ToByte(dr["PaymentTypeID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mReqBillNo = Convert.ToBoolean(dr["ReqBillNo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mPortShuttlingTRFID = Convert.ToInt32(dr["PortShuttlingTRFID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwClientsYardLinkTank.mIn = Convert.ToBoolean(dr["In"].ToString());
                        ObjCVarvwClientsYardLinkTank.mOut = Convert.ToBoolean(dr["Out"].ToString());
                        ObjCVarvwClientsYardLinkTank.mServiceTariffID = Convert.ToInt32(dr["ServiceTariffID"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLeftOff = Convert.ToBoolean(dr["LeftOff"].ToString());
                        ObjCVarvwClientsYardLinkTank.mblockSizeIn = Convert.ToInt32(dr["blockSizeIn"].ToString());
                        ObjCVarvwClientsYardLinkTank.mblockSizeOut = Convert.ToInt32(dr["blockSizeOut"].ToString());
                        ObjCVarvwClientsYardLinkTank.mGnstTariffId = Convert.ToInt32(dr["GnstTariffId"].ToString());
                        ObjCVarvwClientsYardLinkTank.mSrvcCustId = Convert.ToInt32(dr["SrvcCustId"].ToString());
                        ObjCVarvwClientsYardLinkTank.mTaxNumber = Convert.ToString(dr["TaxNumber"].ToString());
                        ObjCVarvwClientsYardLinkTank.mEnteredFrom = Convert.ToString(dr["EnteredFrom"].ToString());
                        ObjCVarvwClientsYardLinkTank.mlocalAgent = Convert.ToString(dr["localAgent"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAAddressInfo = Convert.ToString(dr["LAAddressInfo"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAPhone1 = Convert.ToString(dr["LAPhone1"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAPhone2 = Convert.ToString(dr["LAPhone2"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAMobile = Convert.ToString(dr["LAMobile"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAFax = Convert.ToString(dr["LAFax"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAEMail = Convert.ToString(dr["LAEMail"].ToString());
                        ObjCVarvwClientsYardLinkTank.mLAWebSite = Convert.ToString(dr["LAWebSite"].ToString());
                        ObjCVarvwClientsYardLinkTank.mCustomerCategoryID = Convert.ToInt32(dr["CustomerCategoryID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwClientsYardLinkTank.Add(ObjCVarvwClientsYardLinkTank);
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
