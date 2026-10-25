using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{

    [Serializable]
    public class CPKGetPS_InvoicesDetailsTotals
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetPS_InvoicesDetailsTotals : CPKGetPS_InvoicesDetailsTotals
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mD_ItemID;
        internal String mD_ItemName;
        internal Decimal mD_Total;
        internal Decimal mD_AveragePrice;
        internal Decimal mD_Quantity;
        #endregion

        #region "Methods"
        public Int64 D_ItemID
        {
            get { return mD_ItemID; }
            set { mD_ItemID = value; }
        }
        public String D_ItemName
        {
            get { return mD_ItemName; }
            set { mD_ItemName = value; }
        }
        public Decimal D_Total
        {
            get { return mD_Total; }
            set { mD_Total = value; }
        }
        public Decimal D_AveragePrice
        {
            get { return mD_AveragePrice; }
            set { mD_AveragePrice = value; }
        }
        public Decimal D_Quantity
        {
            get { return mD_Quantity; }
            set { mD_Quantity = value; }
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

    public partial class CGetPS_InvoicesDetailsTotals
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
        public List<CVarGetPS_InvoicesDetailsTotals> lstCVarGetPS_InvoicesDetailsTotals = new List<CVarGetPS_InvoicesDetailsTotals>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate , DateTime ToDate , string SupplierIDs , string ItemIDs)
        {
            return DataFill(FromDate , ToDate, SupplierIDs , ItemIDs , true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime FromDate , DateTime ToDate, string SupplierIDs, string ItemIDs,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetPS_InvoicesDetailsTotals.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));

                    Com.Parameters.Add(new SqlParameter("@SupplierIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@ItemIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetPS_InvoicesDetailsTotals";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = SupplierIDs;
                    Com.Parameters[3].Value = ItemIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetPS_InvoicesDetailsTotals ObjCVarGetPS_InvoicesDetailsTotals = new CVarGetPS_InvoicesDetailsTotals();
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_AveragePrice = Convert.ToDecimal(dr["D_AveragePrice"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        lstCVarGetPS_InvoicesDetailsTotals.Add(ObjCVarGetPS_InvoicesDetailsTotals);
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
            lstCVarGetPS_InvoicesDetailsTotals.Clear();

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
                Com.CommandText = "[dbo].GetListPagingGetPS_InvoicesDetailsTotals";
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
                        CVarGetPS_InvoicesDetailsTotals ObjCVarGetPS_InvoicesDetailsTotals = new CVarGetPS_InvoicesDetailsTotals();
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_ItemID = Convert.ToInt64(dr["D_ItemID"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_ItemName = Convert.ToString(dr["D_ItemName"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_Total = Convert.ToDecimal(dr["D_Total"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_AveragePrice = Convert.ToDecimal(dr["D_AveragePrice"].ToString());
                        ObjCVarGetPS_InvoicesDetailsTotals.mD_Quantity = Convert.ToDecimal(dr["D_Quantity"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarGetPS_InvoicesDetailsTotals.Add(ObjCVarGetPS_InvoicesDetailsTotals);
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
