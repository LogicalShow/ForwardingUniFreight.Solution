using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Customized
{

    #region SC_GetTransactionsDetails

    [Serializable]
    public class CPKSC_GetTransactionsDetails
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_GetTransactionsDetails : CPKSC_GetTransactionsDetails
    {
        #region "variables"
        internal DateTime mTransactionDate;
        internal string mTransactionType;
        internal string mInvoiceNumber;
        internal string mCustomerName;
        internal decimal mQtyImport;
        internal decimal mQtyExport;
        internal decimal mPriceImport;
        internal decimal mPriceExport;
        internal decimal mAveragePrice;
        internal decimal mTotalQuantity;
        internal decimal mTotalPrice;
        internal string mItemName;
        internal string mStoreName;
        internal long mItemID;
        internal int mStoreID;
        internal string mTransactionCode;
        internal string mUsername;
        internal string mItemCode;
        internal string mTransactionStatue;
        #endregion

        #region "Methods"
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public string TransactionType
        {
            get { return mTransactionType; }
            set { mTransactionType = value; }
        }
        public string InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public string CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public decimal QtyImport
        {
            get { return mQtyImport; }
            set { mQtyImport = value; }
        }
        public decimal QtyExport
        {
            get { return mQtyExport; }
            set { mQtyExport = value; }
        }
        public decimal PriceImport
        {
            get { return mPriceImport; }
            set { mPriceImport = value; }
        }
        public decimal PriceExport
        {
            get { return mPriceExport; }
            set { mPriceExport = value; }
        }
        public decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mAveragePrice = value; }
        }
        public decimal TotalQuantity
        {
            get { return mTotalQuantity; }
            set { mTotalQuantity = value; }
        }
        public decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
        }
        public string ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public string StoreName
        {
            get { return mStoreName; }
            set { mStoreName = value; }
        }
        public long ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public int StoreID
        {
            get { return mStoreID; }
            set { mStoreID = value; }
        }
        public string TransactionCode
        {
            get { return mTransactionCode; }
            set { mTransactionCode = value; }
        }
        public string Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public string ItemCode
        {
            get { return mItemCode; }
            set { mItemCode = value; }
        }
        public string TransactionStatue
        {
            get { return mTransactionStatue; }
            set { mTransactionStatue = value; }
        }

        #endregion

        #region Functions

        #endregion
    }

    public partial class CSC_GetTransactionsDetails
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
        public List<CVarSC_GetTransactionsDetails> lstCVarSC_GetTransactionsDetails = new List<CVarSC_GetTransactionsDetails>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string ItemsIDs, string StoreIDs, DateTime FromDate, DateTime ToDate,Int32 pClientID, Int32 PsupplierID)
        {
            return DataFill(ItemsIDs, StoreIDs, FromDate, ToDate, pClientID, PsupplierID, true);
        }
        private Exception DataFill(string ItemsIDs, string StoreIDs, DateTime FromDate, DateTime ToDate, Int32 pClientID, Int32 PsupplierID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_GetTransactionsDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;

                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ItemIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@StoreIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));



                    Com.CommandText = "[dbo].[SC_GetTransactionsDetails]";
                    Com.Parameters[0].Value = ItemsIDs;
                    Com.Parameters[1].Value = StoreIDs;
                    Com.Parameters[2].Value = FromDate;
                    Com.Parameters[3].Value = ToDate;
                    Com.Parameters[4].Value = pClientID;
                    Com.Parameters[5].Value = PsupplierID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_GetTransactionsDetails ObjCVarSC_GetTransactionsDetails = new CVarSC_GetTransactionsDetails();
                        ObjCVarSC_GetTransactionsDetails.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mTransactionType = Convert.ToString(dr["TransactionType"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mInvoiceNumber = Convert.ToString(dr["InvoiceNumber"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mQtyImport = Convert.ToDecimal(dr["QtyImport"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mQtyExport = Convert.ToDecimal(dr["QtyExport"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mPriceImport = Convert.ToDecimal(dr["PriceImport"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mPriceExport = Convert.ToDecimal(dr["PriceExport"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mTotalQuantity = Convert.ToDecimal(dr["TotalQuantity"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mStoreName = Convert.ToString(dr["StoreName"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mTransactionCode = Convert.ToString(dr["TransactionCode"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
                        ObjCVarSC_GetTransactionsDetails.mTransactionStatue = Convert.ToString(dr["TransactionStatue"].ToString());
                        lstCVarSC_GetTransactionsDetails.Add(ObjCVarSC_GetTransactionsDetails);
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


    #endregion SC_GetTransactionsDetails



    #region  SC_Get_All_GroupItems

    [Serializable]
    public class CPKSC_Get_All_GroupItems
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_Get_All_GroupItems : CPKSC_Get_All_GroupItems
    {
        #region "variables"


//        SELECT p.ID , p.Code + ' - ' +   p.Name FullName, p.Name , p.PackageTypeID ,
//p.ParentGroupID from dbo.PurchaseItem p




        internal long mID;
        internal string mCode;
        internal string mFullName;
        internal string mName;
        internal int mParentGroupID;
        internal int mPackageTypeID;
        #endregion

        #region "Methods"
        public long ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public string Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public string FullName
        {
            get { return mFullName; }
            set { mFullName = value; }
        }
        public int ParentGroupID
        {
            get { return mParentGroupID; }
            set { mParentGroupID = value; }
        }
        public int PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }


        #endregion

        #region Functions

        #endregion
    }

    public partial class CSC_Get_All_GroupItems
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
        public List<CVarSC_Get_All_GroupItems> lstCVarSC_Get_All_GroupItems = new List<CVarSC_Get_All_GroupItems>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int GroupID)
        {
            return DataFill(GroupID, true);
        }
        private Exception DataFill(int GroupID , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_Get_All_GroupItems.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));


                    Com.CommandText = "[dbo].[SC_Get_All_GroupItems]";
                    Com.Parameters[0].Value = GroupID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_Get_All_GroupItems ObjCVarSC_Get_All_GroupItems = new CVarSC_Get_All_GroupItems();
                        ObjCVarSC_Get_All_GroupItems.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSC_Get_All_GroupItems.mCode = dr["Code"].ToString();
                        ObjCVarSC_Get_All_GroupItems.mFullName = dr["FullName"].ToString();
                        ObjCVarSC_Get_All_GroupItems.mName = dr["Name"].ToString();
                        ObjCVarSC_Get_All_GroupItems.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarSC_Get_All_GroupItems.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());



                        lstCVarSC_Get_All_GroupItems.Add(ObjCVarSC_Get_All_GroupItems);
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
    #endregion SC_Get_All_GroupItems


}
