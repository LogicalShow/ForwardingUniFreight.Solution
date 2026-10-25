using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public partial class CVarvwClients
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal String mName;
        internal String mArabicName;
        internal Int32 mCountryID;
        internal String mCityName;
        internal String mAddressInfo;
        internal String mPhone;
        internal String mMobile;
        internal String mFax;
        internal String mEMail;
        internal String mContactPerson;
        internal String mPrintedBillData;
        internal Boolean mIsShipper;
        internal Boolean mIsConsignee;
        internal Boolean mIsNotifyParty;
        internal Boolean mIsForwarder;
        internal Boolean mIsAgreementParty;
        internal String mRemarks;
        internal String mAccCode;
        internal String mIsERPClient;
        internal Boolean mIsCredit;
        internal String mTaxNumber;

        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String ArabicName
        {
            get { return mArabicName; }
            set { mArabicName = value; }
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
        public String Phone
        {
            get { return mPhone; }
            set { mPhone = value; }
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
        public String ContactPerson
        {
            get { return mContactPerson; }
            set { mContactPerson = value; }
        }
        public String PrintedBillData
        {
            get { return mPrintedBillData; }
            set { mPrintedBillData = value; }
        }
        public Boolean IsShipper
        {
            get { return mIsShipper; }
            set { mIsShipper = value; }
        }
        public Boolean IsConsignee
        {
            get { return mIsConsignee; }
            set { mIsConsignee = value; }
        }
        public Boolean IsNotifyParty
        {
            get { return mIsNotifyParty; }
            set { mIsNotifyParty = value; }
        }
        public Boolean IsForwarder
        {
            get { return mIsForwarder; }
            set { mIsForwarder = value; }
        }
        public Boolean IsAgreementParty
        {
            get { return mIsAgreementParty; }
            set { mIsAgreementParty = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public String AccCode
        {
            get { return mAccCode; }
            set { mAccCode = value; }
        }
        public String IsERPClient
        {
            get { return mIsERPClient; }
            set { mIsERPClient = value; }
        }
        public Boolean IsCredit
        {
            get { return mIsCredit; }
            set { mIsCredit = value; }
        }
        public String TaxNumber
        {
            get { return mTaxNumber; }
            set { mTaxNumber = value; }
        }
        #endregion
    }

    public partial class CvwClients
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
        public List<CVarvwClients> lstCVarvwClients = new List<CVarvwClients>();
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
            lstCVarvwClients.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwClients";
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
                        CVarvwClients ObjCVarvwClients = new CVarvwClients();
                        ObjCVarvwClients.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwClients.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwClients.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwClients.mArabicName = Convert.ToString(dr["ArabicName"].ToString());
                        ObjCVarvwClients.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwClients.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwClients.mAddressInfo = Convert.ToString(dr["AddressInfo"].ToString());
                        ObjCVarvwClients.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarvwClients.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwClients.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwClients.mEMail = Convert.ToString(dr["EMail"].ToString());
                        ObjCVarvwClients.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwClients.mPrintedBillData = Convert.ToString(dr["PrintedBillData"].ToString());
                        ObjCVarvwClients.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarvwClients.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarvwClients.mIsNotifyParty = Convert.ToBoolean(dr["IsNotifyParty"].ToString());
                        ObjCVarvwClients.mIsForwarder = Convert.ToBoolean(dr["IsForwarder"].ToString());
                        ObjCVarvwClients.mIsAgreementParty = Convert.ToBoolean(dr["IsAgreementParty"].ToString());
                        ObjCVarvwClients.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwClients.mAccCode = Convert.ToString(dr["AccCode"].ToString());
                        ObjCVarvwClients.mIsERPClient = Convert.ToString(dr["IsERPClient"].ToString());
                        ObjCVarvwClients.mIsCredit = Convert.ToBoolean(dr["IsCredit"].ToString());
                        ObjCVarvwClients.mTaxNumber = Convert.ToString(dr["TaxNumber"].ToString());

                        lstCVarvwClients.Add(ObjCVarvwClients);
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
            lstCVarvwClients.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwClients";
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
                        CVarvwClients ObjCVarvwClients = new CVarvwClients();
                        ObjCVarvwClients.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwClients.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwClients.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwClients.mArabicName = Convert.ToString(dr["ArabicName"].ToString());
                        ObjCVarvwClients.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwClients.mCityName = Convert.ToString(dr["CityName"].ToString());
                        ObjCVarvwClients.mAddressInfo = Convert.ToString(dr["AddressInfo"].ToString());
                        ObjCVarvwClients.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarvwClients.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarvwClients.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwClients.mEMail = Convert.ToString(dr["EMail"].ToString());
                        ObjCVarvwClients.mContactPerson = Convert.ToString(dr["ContactPerson"].ToString());
                        ObjCVarvwClients.mPrintedBillData = Convert.ToString(dr["PrintedBillData"].ToString());
                        ObjCVarvwClients.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarvwClients.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarvwClients.mIsNotifyParty = Convert.ToBoolean(dr["IsNotifyParty"].ToString());
                        ObjCVarvwClients.mIsForwarder = Convert.ToBoolean(dr["IsForwarder"].ToString());
                        ObjCVarvwClients.mIsAgreementParty = Convert.ToBoolean(dr["IsAgreementParty"].ToString());
                        ObjCVarvwClients.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwClients.mAccCode = Convert.ToString(dr["AccCode"].ToString());
                        ObjCVarvwClients.mIsERPClient = Convert.ToString(dr["IsERPClient"].ToString());
                        ObjCVarvwClients.mIsCredit = Convert.ToBoolean(dr["IsCredit"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwClients.Add(ObjCVarvwClients);
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
