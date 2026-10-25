using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwOperationByCustudy
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal String mOperationCode;
        internal Int32 mOperationPartnerTypeID;
        internal Int64 mContactID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeName;
        internal Int32 mViewOrder;
        internal Int32 mPartnerID;
        internal String mNetworksNames;
        internal String mNetworksIDs;
        internal String mPartnerName;
        internal String mPartnerLocalName;
        internal String mClientEmailNotContact;
        internal Int32 mPaymentTermID;
        internal String mCode;
        internal String mName;
        internal String mPhonesAndFaxes;
        internal String mAddress;
        internal String mContactName;
        internal String mContactLocalName;
        internal String mEmail;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal String mFax;
        internal Int32 mUsedInPayablesCount;
        internal Int32 mUsedInInvoicesCount;
        internal Boolean mIsOperationClient;
        internal String mActualArrivalString;
        internal Int32 mVesselID;
        internal String mVesselName;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 OperationPartnerTypeID
        {
            get { return mOperationPartnerTypeID; }
            set { mOperationPartnerTypeID = value; }
        }
        public Int64 ContactID
        {
            get { return mContactID; }
            set { mContactID = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeName
        {
            get { return mPartnerTypeName; }
            set { mPartnerTypeName = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String NetworksNames
        {
            get { return mNetworksNames; }
            set { mNetworksNames = value; }
        }
        public String NetworksIDs
        {
            get { return mNetworksIDs; }
            set { mNetworksIDs = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String PartnerLocalName
        {
            get { return mPartnerLocalName; }
            set { mPartnerLocalName = value; }
        }
        public String ClientEmailNotContact
        {
            get { return mClientEmailNotContact; }
            set { mClientEmailNotContact = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
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
        public String PhonesAndFaxes
        {
            get { return mPhonesAndFaxes; }
            set { mPhonesAndFaxes = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public String ContactName
        {
            get { return mContactName; }
            set { mContactName = value; }
        }
        public String ContactLocalName
        {
            get { return mContactLocalName; }
            set { mContactLocalName = value; }
        }
        public String Email
        {
            get { return mEmail; }
            set { mEmail = value; }
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
        public String Mobile1
        {
            get { return mMobile1; }
            set { mMobile1 = value; }
        }
        public String Fax
        {
            get { return mFax; }
            set { mFax = value; }
        }
        public Int32 UsedInPayablesCount
        {
            get { return mUsedInPayablesCount; }
            set { mUsedInPayablesCount = value; }
        }
        public Int32 UsedInInvoicesCount
        {
            get { return mUsedInInvoicesCount; }
            set { mUsedInInvoicesCount = value; }
        }
        public Boolean IsOperationClient
        {
            get { return mIsOperationClient; }
            set { mIsOperationClient = value; }
        }
        public String ActualArrivalString
        {
            get { return mActualArrivalString; }
            set { mActualArrivalString = value; }
        }
        public Int32 VesselID
        {
            get { return mVesselID; }
            set { mVesselID = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        #endregion
    }

    public partial class CvwOperationByCustudy
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
        public List<CVarvwOperationByCustudy> lstCVarvwOperationByCustudy = new List<CVarvwOperationByCustudy>();
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
            lstCVarvwOperationByCustudy.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationByCustudy";
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
                        CVarvwOperationByCustudy ObjCVarvwOperationByCustudy = new CVarvwOperationByCustudy();
                        ObjCVarvwOperationByCustudy.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationByCustudy.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationPartnerTypeID = Convert.ToInt32(dr["OperationPartnerTypeID"].ToString());
                        ObjCVarvwOperationByCustudy.mContactID = Convert.ToInt64(dr["ContactID"].ToString());
                        ObjCVarvwOperationByCustudy.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationByCustudy.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationByCustudy.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationByCustudy.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwOperationByCustudy.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwOperationByCustudy.mNetworksNames = Convert.ToString(dr["NetworksNames"].ToString());
                        ObjCVarvwOperationByCustudy.mNetworksIDs = Convert.ToString(dr["NetworksIDs"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwOperationByCustudy.mClientEmailNotContact = Convert.ToString(dr["ClientEmailNotContact"].ToString());
                        ObjCVarvwOperationByCustudy.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwOperationByCustudy.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationByCustudy.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwOperationByCustudy.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarvwOperationByCustudy.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwOperationByCustudy.mContactName = Convert.ToString(dr["ContactName"].ToString());
                        ObjCVarvwOperationByCustudy.mContactLocalName = Convert.ToString(dr["ContactLocalName"].ToString());
                        ObjCVarvwOperationByCustudy.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwOperationByCustudy.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwOperationByCustudy.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwOperationByCustudy.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwOperationByCustudy.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwOperationByCustudy.mUsedInPayablesCount = Convert.ToInt32(dr["UsedInPayablesCount"].ToString());
                        ObjCVarvwOperationByCustudy.mUsedInInvoicesCount = Convert.ToInt32(dr["UsedInInvoicesCount"].ToString());
                        ObjCVarvwOperationByCustudy.mIsOperationClient = Convert.ToBoolean(dr["IsOperationClient"].ToString());
                        ObjCVarvwOperationByCustudy.mActualArrivalString = Convert.ToString(dr["ActualArrivalString"].ToString());
                        ObjCVarvwOperationByCustudy.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationByCustudy.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        lstCVarvwOperationByCustudy.Add(ObjCVarvwOperationByCustudy);
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
            lstCVarvwOperationByCustudy.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationByCustudy";
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
                        CVarvwOperationByCustudy ObjCVarvwOperationByCustudy = new CVarvwOperationByCustudy();
                        ObjCVarvwOperationByCustudy.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationByCustudy.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwOperationByCustudy.mOperationPartnerTypeID = Convert.ToInt32(dr["OperationPartnerTypeID"].ToString());
                        ObjCVarvwOperationByCustudy.mContactID = Convert.ToInt64(dr["ContactID"].ToString());
                        ObjCVarvwOperationByCustudy.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationByCustudy.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationByCustudy.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationByCustudy.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwOperationByCustudy.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwOperationByCustudy.mNetworksNames = Convert.ToString(dr["NetworksNames"].ToString());
                        ObjCVarvwOperationByCustudy.mNetworksIDs = Convert.ToString(dr["NetworksIDs"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwOperationByCustudy.mPartnerLocalName = Convert.ToString(dr["PartnerLocalName"].ToString());
                        ObjCVarvwOperationByCustudy.mClientEmailNotContact = Convert.ToString(dr["ClientEmailNotContact"].ToString());
                        ObjCVarvwOperationByCustudy.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwOperationByCustudy.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationByCustudy.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwOperationByCustudy.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarvwOperationByCustudy.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwOperationByCustudy.mContactName = Convert.ToString(dr["ContactName"].ToString());
                        ObjCVarvwOperationByCustudy.mContactLocalName = Convert.ToString(dr["ContactLocalName"].ToString());
                        ObjCVarvwOperationByCustudy.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwOperationByCustudy.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarvwOperationByCustudy.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarvwOperationByCustudy.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarvwOperationByCustudy.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarvwOperationByCustudy.mUsedInPayablesCount = Convert.ToInt32(dr["UsedInPayablesCount"].ToString());
                        ObjCVarvwOperationByCustudy.mUsedInInvoicesCount = Convert.ToInt32(dr["UsedInInvoicesCount"].ToString());
                        ObjCVarvwOperationByCustudy.mIsOperationClient = Convert.ToBoolean(dr["IsOperationClient"].ToString());
                        ObjCVarvwOperationByCustudy.mActualArrivalString = Convert.ToString(dr["ActualArrivalString"].ToString());
                        ObjCVarvwOperationByCustudy.mVesselID = Convert.ToInt32(dr["VesselID"].ToString());
                        ObjCVarvwOperationByCustudy.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationByCustudy.Add(ObjCVarvwOperationByCustudy);
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
