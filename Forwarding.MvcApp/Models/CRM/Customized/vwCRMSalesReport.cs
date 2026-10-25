using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated
{
    [Serializable]
    public class CPKvwCRMSalesReport
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwCRMSalesReport : CPKvwCRMSalesReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mFiscal_Year_Name;
        internal String mUserName;
        internal Int32 mUserID;
        internal Int32 mNumberOfFilesYTD;
        internal Int32 mNumberOfNewCustomersYTD;
        internal Int32 mNumberOfmeetingsYTD;
        internal Decimal mAnnualTarget;
        internal Decimal mActVSTargetYTD;
        #endregion

        #region "Methods"
        public String Fiscal_Year_Name
        {
            get { return mFiscal_Year_Name; }
            set { mFiscal_Year_Name = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 NumberOfFilesYTD
        {
            get { return mNumberOfFilesYTD; }
            set { mNumberOfFilesYTD = value; }
        }
        public Int32 NumberOfNewCustomersYTD
        {
            get { return mNumberOfNewCustomersYTD; }
            set { mNumberOfNewCustomersYTD = value; }
        }
        public Int32 NumberOfmeetingsYTD
        {
            get { return mNumberOfmeetingsYTD; }
            set { mNumberOfmeetingsYTD = value; }
        }
        public Decimal AnnualTarget
        {
            get { return mAnnualTarget; }
            set { mAnnualTarget = value; }
        }
        public Decimal ActVSTargetYTD
        {
            get { return mActVSTargetYTD; }
            set { mActVSTargetYTD = value; }
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

    public partial class CvwCRMSalesReport
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
        public List<CVarvwCRMSalesReport> lstCVarvwCRMSalesReport = new List<CVarvwCRMSalesReport>();
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
            lstCVarvwCRMSalesReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCRMSalesReport";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRMSalesReport ObjCVarvwCRMSalesReport = new CVarvwCRMSalesReport();
                        ObjCVarvwCRMSalesReport.mFiscal_Year_Name = Convert.ToString(dr["Fiscal_Year_Name"].ToString());
                        ObjCVarvwCRMSalesReport.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwCRMSalesReport.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfFilesYTD = Convert.ToInt32(dr["NumberOfFilesYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfNewCustomersYTD = Convert.ToInt32(dr["NumberOfNewCustomersYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfmeetingsYTD = Convert.ToInt32(dr["NumberOfmeetingsYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mAnnualTarget = Convert.ToDecimal(dr["AnnualTarget"].ToString());
                        ObjCVarvwCRMSalesReport.mActVSTargetYTD = Convert.ToDecimal(dr["ActVSTargetYTD"].ToString());
                        lstCVarvwCRMSalesReport.Add(ObjCVarvwCRMSalesReport);
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
            lstCVarvwCRMSalesReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRMSalesReport";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRMSalesReport ObjCVarvwCRMSalesReport = new CVarvwCRMSalesReport();
                        ObjCVarvwCRMSalesReport.mFiscal_Year_Name = Convert.ToString(dr["Fiscal_Year_Name"].ToString());
                        ObjCVarvwCRMSalesReport.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwCRMSalesReport.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfFilesYTD = Convert.ToInt32(dr["NumberOfFilesYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfNewCustomersYTD = Convert.ToInt32(dr["NumberOfNewCustomersYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mNumberOfmeetingsYTD = Convert.ToInt32(dr["NumberOfmeetingsYTD"].ToString());
                        ObjCVarvwCRMSalesReport.mAnnualTarget = Convert.ToDecimal(dr["AnnualTarget"].ToString());
                        ObjCVarvwCRMSalesReport.mActVSTargetYTD = Convert.ToDecimal(dr["ActVSTargetYTD"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRMSalesReport.Add(ObjCVarvwCRMSalesReport);
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
