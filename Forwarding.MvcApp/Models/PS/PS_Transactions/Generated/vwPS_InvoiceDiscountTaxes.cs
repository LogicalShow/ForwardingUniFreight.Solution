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
    public class CPKvwPS_InvoiceDiscountTaxes
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwPS_InvoiceDiscountTaxes : CPKvwPS_InvoiceDiscountTaxes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Boolean mIsTax;
        internal Int32 mTaxID;
        internal String mName;
        internal Decimal mVALUE;
        internal Int64 mInvoiceID;
        internal Boolean mISDiscountBeforeTax;
        #endregion

        #region "Methods"
        public Boolean IsTax
        {
            get { return mIsTax; }
            set { mIsTax = value; }
        }
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mTaxID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Decimal VALUE
        {
            get { return mVALUE; }
            set { mVALUE = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Boolean ISDiscountBeforeTax
        {
            get { return mISDiscountBeforeTax; }
            set { mISDiscountBeforeTax = value; }
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

    public partial class CvwPS_InvoiceDiscountTaxes
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
        public List<CVarvwPS_InvoiceDiscountTaxes> lstCVarvwPS_InvoiceDiscountTaxes = new List<CVarvwPS_InvoiceDiscountTaxes>();
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
            lstCVarvwPS_InvoiceDiscountTaxes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_InvoiceDiscountTaxes";
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
                        CVarvwPS_InvoiceDiscountTaxes ObjCVarvwPS_InvoiceDiscountTaxes = new CVarvwPS_InvoiceDiscountTaxes();
                        ObjCVarvwPS_InvoiceDiscountTaxes.mIsTax = Convert.ToBoolean(dr["IsTax"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mVALUE = Convert.ToDecimal(dr["VALUE"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        lstCVarvwPS_InvoiceDiscountTaxes.Add(ObjCVarvwPS_InvoiceDiscountTaxes);
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
            lstCVarvwPS_InvoiceDiscountTaxes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_InvoiceDiscountTaxes";
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
                        CVarvwPS_InvoiceDiscountTaxes ObjCVarvwPS_InvoiceDiscountTaxes = new CVarvwPS_InvoiceDiscountTaxes();
                        ObjCVarvwPS_InvoiceDiscountTaxes.mIsTax = Convert.ToBoolean(dr["IsTax"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mVALUE = Convert.ToDecimal(dr["VALUE"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_InvoiceDiscountTaxes.mISDiscountBeforeTax = Convert.ToBoolean(dr["ISDiscountBeforeTax"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_InvoiceDiscountTaxes.Add(ObjCVarvwPS_InvoiceDiscountTaxes);
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
