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
    public class CPKvwPurchaseInvoiceItem
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
    public partial class CVarvwPurchaseInvoiceItem : CPKvwPurchaseInvoiceItem
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPurchaseItemID;
        internal String mPurchaseItemName;
        internal String mPurchaseItemLocalName;
        internal Int64 mPurchaseInvoiceID;
        internal Int64 mInvoiceNumber;
        internal String mEditableCode;
        internal DateTime mInvoiceDate;
        internal String mPartNumber;
        internal Int32 mQuantity;
        internal Int32 mCountryOfOriginID;
        internal String mCountryOfOriginName;
        internal String mHSCode;
        internal Boolean mIsFlexi;
        internal Decimal mUnitPrice;
        internal Decimal mAmount;
        internal String mNotes;
        internal Decimal mExportPrice;
        internal Int64 mOperationID;
        internal Int32 mDirectionType;
        internal Int32 mOperationCodeSerial;
        internal String mOperationCode;
        internal String mGuaranteeLetterNumber;
        internal DateTime mGuaranteeLetterDate;
        #endregion

        #region "Methods"
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mPurchaseItemID = value; }
        }
        public String PurchaseItemName
        {
            get { return mPurchaseItemName; }
            set { mPurchaseItemName = value; }
        }
        public String PurchaseItemLocalName
        {
            get { return mPurchaseItemLocalName; }
            set { mPurchaseItemLocalName = value; }
        }
        public Int64 PurchaseInvoiceID
        {
            get { return mPurchaseInvoiceID; }
            set { mPurchaseInvoiceID = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public String EditableCode
        {
            get { return mEditableCode; }
            set { mEditableCode = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public String PartNumber
        {
            get { return mPartNumber; }
            set { mPartNumber = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
        }
        public Int32 CountryOfOriginID
        {
            get { return mCountryOfOriginID; }
            set { mCountryOfOriginID = value; }
        }
        public String CountryOfOriginName
        {
            get { return mCountryOfOriginName; }
            set { mCountryOfOriginName = value; }
        }
        public String HSCode
        {
            get { return mHSCode; }
            set { mHSCode = value; }
        }
        public Boolean IsFlexi
        {
            get { return mIsFlexi; }
            set { mIsFlexi = value; }
        }
        public Decimal UnitPrice
        {
            get { return mUnitPrice; }
            set { mUnitPrice = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Decimal ExportPrice
        {
            get { return mExportPrice; }
            set { mExportPrice = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
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

    public partial class CvwPurchaseInvoiceItem
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
        public List<CVarvwPurchaseInvoiceItem> lstCVarvwPurchaseInvoiceItem = new List<CVarvwPurchaseInvoiceItem>();
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
            lstCVarvwPurchaseInvoiceItem.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPurchaseInvoiceItem";
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
                        CVarvwPurchaseInvoiceItem ObjCVarvwPurchaseInvoiceItem = new CVarvwPurchaseInvoiceItem();
                        ObjCVarvwPurchaseInvoiceItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemLocalName = Convert.ToString(dr["PurchaseItemLocalName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mCountryOfOriginID = Convert.ToInt32(dr["CountryOfOriginID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mCountryOfOriginName = Convert.ToString(dr["CountryOfOriginName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mIsFlexi = Convert.ToBoolean(dr["IsFlexi"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        lstCVarvwPurchaseInvoiceItem.Add(ObjCVarvwPurchaseInvoiceItem);
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
            lstCVarvwPurchaseInvoiceItem.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPurchaseInvoiceItem";
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
                        CVarvwPurchaseInvoiceItem ObjCVarvwPurchaseInvoiceItem = new CVarvwPurchaseInvoiceItem();
                        ObjCVarvwPurchaseInvoiceItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseItemLocalName = Convert.ToString(dr["PurchaseItemLocalName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mCountryOfOriginID = Convert.ToInt32(dr["CountryOfOriginID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mCountryOfOriginName = Convert.ToString(dr["CountryOfOriginName"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mIsFlexi = Convert.ToBoolean(dr["IsFlexi"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mGuaranteeLetterNumber = Convert.ToString(dr["GuaranteeLetterNumber"].ToString());
                        ObjCVarvwPurchaseInvoiceItem.mGuaranteeLetterDate = Convert.ToDateTime(dr["GuaranteeLetterDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPurchaseInvoiceItem.Add(ObjCVarvwPurchaseInvoiceItem);
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
