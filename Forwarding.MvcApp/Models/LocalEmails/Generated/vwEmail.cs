using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LocalEmails.Generated
{
    [Serializable]
    public class CPKvwEmail
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
    public partial class CVarvwEmail : CPKvwEmail
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSubject;
        internal String mBody;
        internal Int64 mQuotationRouteID;
        internal Int64 mQuotationID;
        internal String mQuotationCode;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int32 mOperationCreatorUserID;
        internal String mOpCreatorName;
        internal Int64 mPricingID;
        internal Int32 mRequestOrReply;
        internal String mRequestOrReplyCase;
        internal Int32 mReceiverUserID;
        internal Int32 mSenderUserID;
        internal String mSenderName;
        internal DateTime mSendingDate;
        internal Boolean mIsAlarm;
        internal String mReceivers;
        internal String mSendingDateAndTime;
        internal Int64 mQuotationRequestID;
        internal Int64 mQuotationRouteRequestID;
        internal Int64 mParentEmailID;
        internal Int32 mEmailSource;
        #endregion

        #region "Methods"
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
        public Int32 OperationCreatorUserID
        {
            get { return mOperationCreatorUserID; }
            set { mOperationCreatorUserID = value; }
        }
        public String OpCreatorName
        {
            get { return mOpCreatorName; }
            set { mOpCreatorName = value; }
        }
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mPricingID = value; }
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
        public Int32 SenderUserID
        {
            get { return mSenderUserID; }
            set { mSenderUserID = value; }
        }
        public String SenderName
        {
            get { return mSenderName; }
            set { mSenderName = value; }
        }
        public DateTime SendingDate
        {
            get { return mSendingDate; }
            set { mSendingDate = value; }
        }
        public Boolean IsAlarm
        {
            get { return mIsAlarm; }
            set { mIsAlarm = value; }
        }
        public String Receivers
        {
            get { return mReceivers; }
            set { mReceivers = value; }
        }
        public String SendingDateAndTime
        {
            get { return mSendingDateAndTime; }
            set { mSendingDateAndTime = value; }
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

    public partial class CvwEmail
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
        public List<CVarvwEmail> lstCVarvwEmail = new List<CVarvwEmail>();
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
            lstCVarvwEmail.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwEmail";
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
                        CVarvwEmail ObjCVarvwEmail = new CVarvwEmail();
                        ObjCVarvwEmail.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwEmail.mSubject = Convert.ToString(dr["Subject"].ToString());
                        ObjCVarvwEmail.mBody = Convert.ToString(dr["Body"].ToString());
                        ObjCVarvwEmail.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwEmail.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwEmail.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwEmail.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwEmail.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwEmail.mOperationCreatorUserID = Convert.ToInt32(dr["OperationCreatorUserID"].ToString());
                        ObjCVarvwEmail.mOpCreatorName = Convert.ToString(dr["OpCreatorName"].ToString());
                        ObjCVarvwEmail.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwEmail.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
                        ObjCVarvwEmail.mRequestOrReplyCase = Convert.ToString(dr["RequestOrReplyCase"].ToString());
                        ObjCVarvwEmail.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
                        ObjCVarvwEmail.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
                        ObjCVarvwEmail.mSenderName = Convert.ToString(dr["SenderName"].ToString());
                        ObjCVarvwEmail.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarvwEmail.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
                        ObjCVarvwEmail.mReceivers = Convert.ToString(dr["Receivers"].ToString());
                        ObjCVarvwEmail.mSendingDateAndTime = Convert.ToString(dr["SendingDateAndTime"].ToString());
                        ObjCVarvwEmail.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
                        ObjCVarvwEmail.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
                        ObjCVarvwEmail.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
                        ObjCVarvwEmail.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
                        lstCVarvwEmail.Add(ObjCVarvwEmail);
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
            lstCVarvwEmail.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwEmail";
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
                        CVarvwEmail ObjCVarvwEmail = new CVarvwEmail();
                        ObjCVarvwEmail.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwEmail.mSubject = Convert.ToString(dr["Subject"].ToString());
                        ObjCVarvwEmail.mBody = Convert.ToString(dr["Body"].ToString());
                        ObjCVarvwEmail.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwEmail.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwEmail.mQuotationCode = Convert.ToString(dr["QuotationCode"].ToString());
                        ObjCVarvwEmail.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwEmail.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwEmail.mOperationCreatorUserID = Convert.ToInt32(dr["OperationCreatorUserID"].ToString());
                        ObjCVarvwEmail.mOpCreatorName = Convert.ToString(dr["OpCreatorName"].ToString());
                        ObjCVarvwEmail.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarvwEmail.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
                        ObjCVarvwEmail.mRequestOrReplyCase = Convert.ToString(dr["RequestOrReplyCase"].ToString());
                        ObjCVarvwEmail.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
                        ObjCVarvwEmail.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
                        ObjCVarvwEmail.mSenderName = Convert.ToString(dr["SenderName"].ToString());
                        ObjCVarvwEmail.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
                        ObjCVarvwEmail.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
                        ObjCVarvwEmail.mReceivers = Convert.ToString(dr["Receivers"].ToString());
                        ObjCVarvwEmail.mSendingDateAndTime = Convert.ToString(dr["SendingDateAndTime"].ToString());
                        ObjCVarvwEmail.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
                        ObjCVarvwEmail.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
                        ObjCVarvwEmail.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
                        ObjCVarvwEmail.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwEmail.Add(ObjCVarvwEmail);
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
