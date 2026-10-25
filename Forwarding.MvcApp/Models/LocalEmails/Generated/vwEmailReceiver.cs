using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LocalEmails.Generated
{
    [Serializable]
    public class CPKvwEmailReceiver
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
    public partial class CVarvwEmailReceiver : CPKvwEmailReceiver
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mEmailID;
        internal String mSubject;
        internal String mBody;
        internal Int32 mSenderUserID;
        internal DateTime mSendingDate;
        internal String mSendingDateAndTime;
        internal String mSenderName;
        internal Int64 mQuotationRouteID;
        internal Int64 mQuotationID;
        internal String mQuotationCode;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int64 mPricingID;
        internal Int32 mPricingTypeID;
        internal Int32 mRequestOrReply;
        internal String mRequestOrReplyCase;
        internal Int32 mReceiverUserID;
        internal String mReceiverName;
        internal Boolean mIsRead;
        internal Boolean mIsAlarm;
        internal Boolean mIsDeleted;
        internal DateTime mReceivingDate;
        internal Int32 mReceivingTime;
        internal Int64 mQuotationRequestID;
        internal Int64 mQuotationRouteRequestID;
        internal String mQuotationRouteRequestCode;
        internal Int64 mParentEmailID;
        internal Int32 mEmailSource;
        #endregion

        #region "Methods"
        public Int64 EmailID
        {
            get { return mEmailID; }
            set { mEmailID = value; }
        }
        public String Subject
        {
            get { return mSubject; }
            set { mSubject = value; }
        }
        public String Body
        {
            get { return mBody; }
            set { mBody = value; }
        }
        public Int32 SenderUserID
        {
            get { return mSenderUserID; }
            set { mSenderUserID = value; }
        }
        public DateTime SendingDate
        {
            get { return mSendingDate; }
            set { mSendingDate = value; }
        }
        public String SendingDateAndTime
        {
            get { return mSendingDateAndTime; }
            set { mSendingDateAndTime = value; }
        }
        public String SenderName
        {
            get { return mSenderName; }
            set { mSenderName = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mQuotationRouteID = value; }
        }
        public Int64 QuotationID
        {
            get { return mQuotationID; }
            set { mQuotationID = value; }
        }
        public String QuotationCode
        {
            get { return mQuotationCode; }
            set { mQuotationCode = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mPricingID = value; }
        }
        public Int32 PricingTypeID
        {
            get { return mPricingTypeID; }
            set { mPricingTypeID = value; }
        }
        public Int32 RequestOrReply
        {
            get { return mRequestOrReply; }
            set { mRequestOrReply = value; }
        }
        public String RequestOrReplyCase
        {
            get { return mRequestOrReplyCase; }
            set { mRequestOrReplyCase = value; }
        }
        public Int32 ReceiverUserID
        {
            get { return mReceiverUserID; }
            set { mReceiverUserID = value; }
        }
        public String ReceiverName
        {
            get { return mReceiverName; }
            set { mReceiverName = value; }
        }
        public Boolean IsRead
        {
            get { return mIsRead; }
            set { mIsRead = value; }
        }
        public Boolean IsAlarm
        {
            get { return mIsAlarm; }
            set { mIsAlarm = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public DateTime ReceivingDate
        {
            get { return mReceivingDate; }
            set { mReceivingDate = value; }
        }
        public Int32 ReceivingTime
        {
            get { return mReceivingTime; }
            set { mReceivingTime = value; }
        }
        public Int64 QuotationRequestID
        {
            get { return mQuotationRequestID; }
            set { mQuotationRequestID = value; }
        }
        public Int64 QuotationRouteRequestID
        {
            get { return mQuotationRouteRequestID; }
            set { mQuotationRouteRequestID = value; }
        }
        public String QuotationRouteRequestCode
        {
            get { return mQuotationRouteRequestCode; }
            set { mQuotationRouteRequestCode = value; }
        }
        public Int64 ParentEmailID
        {
            get { return mParentEmailID; }
            set { mParentEmailID = value; }
        }
        public Int32 EmailSource
        {
            get { return mEmailSource; }
            set { mEmailSource = value; }
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

    public partial class CvwEmailReceiver
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
        public List<CVarvwEmailReceiver> lstCVarvwEmailReceiver = new List<CVarvwEmailReceiver>();
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
            lstCVarvwEmailReceiver.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwEmailReceiver";
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
                        CVarvwEmailReceiver ObjCVarvwEmailReceiver = new CVarvwEmailReceiver();
                        ObjCVarvwEmailReceiver.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwEmailReceiver.mEmailID = Convert.ToInt64(dr["EmailID"].ToString());
                        ObjCVarvwEmailReceiver.mSubject = Convert.ToString(dr["Subject"].ToString());
                        ObjCVarvwEmailReceiver.mBody = Convert.ToString(dr["Body"].ToString());
                        ObjCVarvwEmailReceiver.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
                        ObjCVarvwEmailReceiver.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarvwEmailReceiver.mSendingDateAndTime = Convert.ToString(dr["SendingDateAndTime"].ToString());
                        ObjCVarvwEmailReceiver.mSenderName = Convert.ToString(dr["SenderName"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwEmailReceiver.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwEmailReceiver.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwEmailReceiver.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwEmailReceiver.mPricingTypeID = Convert.ToInt32(dr["PricingTypeID"].ToString());
                        ObjCVarvwEmailReceiver.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
                        ObjCVarvwEmailReceiver.mRequestOrReplyCase = Convert.ToString(dr["RequestOrReplyCase"].ToString());
                        ObjCVarvwEmailReceiver.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
                        ObjCVarvwEmailReceiver.mReceiverName = Convert.ToString(dr["ReceiverName"].ToString());
                        ObjCVarvwEmailReceiver.mIsRead = Convert.ToBoolean(dr["IsRead"].ToString());
                        ObjCVarvwEmailReceiver.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
                        ObjCVarvwEmailReceiver.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwEmailReceiver.mReceivingDate = Convert.ToDateTime(dr["ReceivingDate"].ToString());
                        ObjCVarvwEmailReceiver.mReceivingTime = Convert.ToInt32(dr["ReceivingTime"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteRequestCode = Convert.ToString(dr["QuotationRouteRequestCode"].ToString());
                        ObjCVarvwEmailReceiver.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
                        ObjCVarvwEmailReceiver.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
                        lstCVarvwEmailReceiver.Add(ObjCVarvwEmailReceiver);
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
            lstCVarvwEmailReceiver.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwEmailReceiver";
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
                        CVarvwEmailReceiver ObjCVarvwEmailReceiver = new CVarvwEmailReceiver();
                        ObjCVarvwEmailReceiver.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwEmailReceiver.mEmailID = Convert.ToInt64(dr["EmailID"].ToString());
                        ObjCVarvwEmailReceiver.mSubject = Convert.ToString(dr["Subject"].ToString());
                        ObjCVarvwEmailReceiver.mBody = Convert.ToString(dr["Body"].ToString());
                        ObjCVarvwEmailReceiver.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
                        ObjCVarvwEmailReceiver.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarvwEmailReceiver.mSendingDateAndTime = Convert.ToString(dr["SendingDateAndTime"].ToString());
                        ObjCVarvwEmailReceiver.mSenderName = Convert.ToString(dr["SenderName"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwEmailReceiver.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwEmailReceiver.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwEmailReceiver.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwEmailReceiver.mPricingTypeID = Convert.ToInt32(dr["PricingTypeID"].ToString());
                        ObjCVarvwEmailReceiver.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
                        ObjCVarvwEmailReceiver.mRequestOrReplyCase = Convert.ToString(dr["RequestOrReplyCase"].ToString());
                        ObjCVarvwEmailReceiver.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
                        ObjCVarvwEmailReceiver.mReceiverName = Convert.ToString(dr["ReceiverName"].ToString());
                        ObjCVarvwEmailReceiver.mIsRead = Convert.ToBoolean(dr["IsRead"].ToString());
                        ObjCVarvwEmailReceiver.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
                        ObjCVarvwEmailReceiver.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwEmailReceiver.mReceivingDate = Convert.ToDateTime(dr["ReceivingDate"].ToString());
                        ObjCVarvwEmailReceiver.mReceivingTime = Convert.ToInt32(dr["ReceivingTime"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
                        ObjCVarvwEmailReceiver.mQuotationRouteRequestCode = Convert.ToString(dr["QuotationRouteRequestCode"].ToString());
                        ObjCVarvwEmailReceiver.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
                        ObjCVarvwEmailReceiver.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwEmailReceiver.Add(ObjCVarvwEmailReceiver);
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
