using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKGetGetSL_LastThreePurshaseInvoicesByItemID
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetGetSL_LastThreePurshaseInvoicesByItemID : CPKGetGetSL_LastThreePurshaseInvoicesByItemID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mItemName;
        internal Int32 mItemID;
        internal Decimal mQty;
        internal Decimal mUnitPrice;
        internal string mInvoiceDate;

        internal Decimal mQty2;
        internal Decimal mUnitPrice2;
        internal string mInvoiceDate2;

        internal Decimal mQty3;
        internal Decimal mUnitPrice3;
        internal string mInvoiceDate3;
        #endregion

        #region "Methods"
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public Int32 ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Decimal UnitPrice
        {
            get { return mUnitPrice; }
            set { mUnitPrice = value; }
        }
      
        public string InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Decimal Qty2
        {
            get { return mQty2; }
            set { mQty2 = value; }
        }
        public Decimal UnitPrice2
        {
            get { return mUnitPrice2; }
            set { mUnitPrice2 = value; }
        }

        public string InvoiceDate2
        {
            get { return mInvoiceDate2; }
            set { mInvoiceDate2 = value; }
        }
        public Decimal Qty3
        {
            get { return mQty3; }
            set { mQty3 = value; }
        }
        public Decimal UnitPrice3
        {
            get { return mUnitPrice3; }
            set { mUnitPrice3 = value; }
        }

        public string InvoiceDate3
        {
            get { return mInvoiceDate3; }
            set { mInvoiceDate3 = value; }
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

    public partial class CGetGetSL_LastThreePurshaseInvoicesByItemID
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
        public List<CVarGetGetSL_LastThreePurshaseInvoicesByItemID> lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID = new List<CVarGetGetSL_LastThreePurshaseInvoicesByItemID>();
        #endregion

        #region "Select Methods"
        public Exception GetList(Int32 ItemID)
        {
            return DataFill(ItemID, true);
        }
        //public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        //{
        //    return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        //}
        private Exception DataFill(Int32 ItemID,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.Int));
                 
                    Com.CommandText = "[dbo].SL_GetLastThreePurshaseInvoicesByItemID";
                    Com.Parameters[0].Value = ItemID;
                   
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetGetSL_LastThreePurshaseInvoicesByItemID ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID = new CVarGetGetSL_LastThreePurshaseInvoicesByItemID();
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mInvoiceDate = Convert.ToString(dr["InvoiceDate"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mQty2 = Convert.ToDecimal(dr["Qty2"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mUnitPrice2 = Convert.ToDecimal(dr["UnitPrice2"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mInvoiceDate2 = Convert.ToString(dr["InvoiceDate2"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mQty3 = Convert.ToDecimal(dr["Qty3"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mUnitPrice3 = Convert.ToDecimal(dr["UnitPrice3"].ToString());
                        ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mInvoiceDate3 = Convert.ToString(dr["InvoiceDate3"].ToString());

                        //   ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mInvoiceDate = dr["InvoiceDate"].ToString() == "" ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(dr["InvoiceDate"].ToString());

                        lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID.Add(ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID);
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

        //private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        //{
        //    Exception Exp = null;
        //    TotRecs = 0;
        //    SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
        //    SqlCommand Com;
        //    SqlDataReader dr;
        //    lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID.Clear();

        //    try
        //    {
        //        Con.Open();
        //        tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
        //        Com = new SqlCommand();
        //        Com.CommandType = CommandType.StoredProcedure;
        //        Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
        //        Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
        //        Com.CommandText = "[dbo].GetListPagingGetGetSL_LastThreePurshaseInvoicesByItemID";
        //        Com.Parameters[0].Value = PageSize;
        //        Com.Parameters[1].Value = PageNumber;
        //        Com.Parameters[2].Value = WhereClause;
        //        Com.Parameters[3].Value = OrderBy;
        //        Com.Transaction = tr;
        //        Com.Connection = Con;
        //        dr = Com.ExecuteReader();
        //        try
        //        {
        //            while (dr.Read())
        //            {
        //                /*Start DataReader*/
        //                CVarGetGetSL_LastThreePurshaseInvoicesByItemID ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID = new CVarGetGetSL_LastThreePurshaseInvoicesByItemID();
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mClientName = Convert.ToString(dr["ClientName"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
        //                ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
        //                TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
        //                lstCVarGetGetSL_LastThreePurshaseInvoicesByItemID.Add(ObjCVarGetGetSL_LastThreePurshaseInvoicesByItemID);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Exp = ex;
        //        }
        //        finally
        //        {
        //            if (dr != null)
        //            {
        //                dr.Close();
        //                dr.Dispose();
        //            }
        //        }
        //        tr.Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Exp = ex;
        //    }
        //    finally
        //    {
        //        Con.Close();
        //        Con.Dispose();
        //    }
        //    return Exp;
        //}

        #endregion
    }




}
