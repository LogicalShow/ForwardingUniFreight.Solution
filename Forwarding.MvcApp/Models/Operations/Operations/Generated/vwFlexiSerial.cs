using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwFlexiSerial
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
    public partial class CVarvwFlexiSerial : CPKvwFlexiSerial
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mImportPurchaseInvoiceItemID;
        internal Int64 mImportPurchaseInvoiceID;
        internal Int64 mImportOperationID;
        internal String mImportOperationCode;
        internal Int32 mImportOperationCodeSerial;
        internal String mGuaranteeLetterNumber;
        internal DateTime mGuaranteeLetterDate;
        internal Int64 mExportPurchaseInvoiceItemID;
        internal Int64 mExportPurchaseInvoiceID;
        internal Int64 mExportOperationID;
        internal String mExportOperationCode;
        internal Int32 mExportOperationCodeSerial;
        internal String mExportClientName;
        internal DateTime mExportInvoiceDate;
        internal String mCode;
        internal Decimal mExportPrice;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal String mNotes;
        internal String mImpOpCertificateNumber;
        internal String mExpOpCertificateNumber;
        #endregion

        #region "Methods"
        public Int64 ImportPurchaseInvoiceItemID
        {
            get { return mImportPurchaseInvoiceItemID; }
            set { mImportPurchaseInvoiceItemID = value; }
        }
        public Int64 ImportPurchaseInvoiceID
        {
            get { return mImportPurchaseInvoiceID; }
            set { mImportPurchaseInvoiceID = value; }
        }
        public Int64 ImportOperationID
        {
            get { return mImportOperationID; }
            set { mImportOperationID = value; }
        }
        public String ImportOperationCode
        {
            get { return mImportOperationCode; }
            set { mImportOperationCode = value; }
        }
        public Int32 ImportOperationCodeSerial
        {
            get { return mImportOperationCodeSerial; }
            set { mImportOperationCodeSerial = value; }
        }
        public String GuaranteeLetterNumber
        {
            get { return mGuaranteeLetterNumber; }
            set { mGuaranteeLetterNumber = value; }
        }
        public DateTime GuaranteeLetterDate
        {
            get { return mGuaranteeLetterDate; }
            set { mGuaranteeLetterDate = value; }
        }
        public Int64 ExportPurchaseInvoiceItemID
        {
            get { return mExportPurchaseInvoiceItemID; }
            set { mExportPurchaseInvoiceItemID = value; }
        }
        public Int64 ExportPurchaseInvoiceID
        {
            get { return mExportPurchaseInvoiceID; }
            set { mExportPurchaseInvoiceID = value; }
        }
        public Int64 ExportOperationID
        {
            get { return mExportOperationID; }
            set { mExportOperationID = value; }
        }
        public String ExportOperationCode
        {
            get { return mExportOperationCode; }
            set { mExportOperationCode = value; }
        }
        public Int32 ExportOperationCodeSerial
        {
            get { return mExportOperationCodeSerial; }
            set { mExportOperationCodeSerial = value; }
        }
        public String ExportClientName
        {
            get { return mExportClientName; }
            set { mExportClientName = value; }
        }
        public DateTime ExportInvoiceDate
        {
            get { return mExportInvoiceDate; }
            set { mExportInvoiceDate = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Decimal ExportPrice
        {
            get { return mExportPrice; }
            set { mExportPrice = value; }
        }
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mContainerNumber = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String ImpOpCertificateNumber
        {
            get { return mImpOpCertificateNumber; }
            set { mImpOpCertificateNumber = value; }
        }
        public String ExpOpCertificateNumber
        {
            get { return mExpOpCertificateNumber; }
            set { mExpOpCertificateNumber = value; }
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

    public partial class CvwFlexiSerial
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
        public List<CVarvwFlexiSerial> lstCVarvwFlexiSerial = new List<CVarvwFlexiSerial>();
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
            lstCVarvwFlexiSerial.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFlexiSerial";
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
                        CVarvwFlexiSerial ObjCVarvwFlexiSerial = new CVarvwFlexiSerial();
                        ObjCVarvwFlexiSerial.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwFlexiSerial.mImportPurchaseInvoiceItemID = Convert.ToInt64(dr["ImportPurchaseInvoiceItemID"].ToString());
                        ObjCVarvwFlexiSerial.mImportPurchaseInvoiceID = Convert.ToInt64(dr["ImportPurchaseInvoiceID"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationID = Convert.ToInt64(dr["ImportOperationID"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationCode = Convert.ToString(dr["ImportOperationCode"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationCodeSerial = Convert.ToInt32(dr["ImportOperationCodeSerial"].ToString());
                        ObjCVarvwFlexiSerial.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarvwFlexiSerial.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        ObjCVarvwFlexiSerial.mExportPurchaseInvoiceItemID = Convert.ToInt64(dr["ExportPurchaseInvoiceItemID"].ToString());
                        ObjCVarvwFlexiSerial.mExportPurchaseInvoiceID = Convert.ToInt64(dr["ExportPurchaseInvoiceID"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationID = Convert.ToInt64(dr["ExportOperationID"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationCode = Convert.ToString(dr["ExportOperationCode"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationCodeSerial = Convert.ToInt32(dr["ExportOperationCodeSerial"].ToString());
                        ObjCVarvwFlexiSerial.mExportClientName = Convert.ToString(dr["ExportClientName"].ToString());
                        ObjCVarvwFlexiSerial.mExportInvoiceDate = Convert.ToDateTime(dr["ExportInvoiceDate"].ToString());
                        ObjCVarvwFlexiSerial.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFlexiSerial.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarvwFlexiSerial.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwFlexiSerial.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwFlexiSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFlexiSerial.mImpOpCertificateNumber = Convert.ToString(dr["ImpOpCertificateNumber"].ToString());
                        ObjCVarvwFlexiSerial.mExpOpCertificateNumber = Convert.ToString(dr["ExpOpCertificateNumber"].ToString());
                        lstCVarvwFlexiSerial.Add(ObjCVarvwFlexiSerial);
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
            lstCVarvwFlexiSerial.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFlexiSerial";
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
                        CVarvwFlexiSerial ObjCVarvwFlexiSerial = new CVarvwFlexiSerial();
                        ObjCVarvwFlexiSerial.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwFlexiSerial.mImportPurchaseInvoiceItemID = Convert.ToInt64(dr["ImportPurchaseInvoiceItemID"].ToString());
                        ObjCVarvwFlexiSerial.mImportPurchaseInvoiceID = Convert.ToInt64(dr["ImportPurchaseInvoiceID"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationID = Convert.ToInt64(dr["ImportOperationID"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationCode = Convert.ToString(dr["ImportOperationCode"].ToString());
                        ObjCVarvwFlexiSerial.mImportOperationCodeSerial = Convert.ToInt32(dr["ImportOperationCodeSerial"].ToString());
                        ObjCVarvwFlexiSerial.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarvwFlexiSerial.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        ObjCVarvwFlexiSerial.mExportPurchaseInvoiceItemID = Convert.ToInt64(dr["ExportPurchaseInvoiceItemID"].ToString());
                        ObjCVarvwFlexiSerial.mExportPurchaseInvoiceID = Convert.ToInt64(dr["ExportPurchaseInvoiceID"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationID = Convert.ToInt64(dr["ExportOperationID"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationCode = Convert.ToString(dr["ExportOperationCode"].ToString());
                        ObjCVarvwFlexiSerial.mExportOperationCodeSerial = Convert.ToInt32(dr["ExportOperationCodeSerial"].ToString());
                        ObjCVarvwFlexiSerial.mExportClientName = Convert.ToString(dr["ExportClientName"].ToString());
                        ObjCVarvwFlexiSerial.mExportInvoiceDate = Convert.ToDateTime(dr["ExportInvoiceDate"].ToString());
                        ObjCVarvwFlexiSerial.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwFlexiSerial.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarvwFlexiSerial.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarvwFlexiSerial.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarvwFlexiSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwFlexiSerial.mImpOpCertificateNumber = Convert.ToString(dr["ImpOpCertificateNumber"].ToString());
                        ObjCVarvwFlexiSerial.mExpOpCertificateNumber = Convert.ToString(dr["ExpOpCertificateNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFlexiSerial.Add(ObjCVarvwFlexiSerial);
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
