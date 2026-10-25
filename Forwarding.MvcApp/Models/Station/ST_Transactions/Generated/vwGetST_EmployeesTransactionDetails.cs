using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKvwGetST_EmployeesTransactionDetails
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwGetST_EmployeesTransactionDetails : CPKvwGetST_EmployeesTransactionDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mEmployeeID;
        internal Decimal mNetSalary;
        internal Decimal madvances;
        internal Decimal mDiscount;
        internal Decimal mExtra;
        internal Decimal mSalary;
        internal Int32 mEmployeesTransactionID;
        internal Boolean misOut;
        internal Int32 mCartoonID;
        internal Decimal mAverage;
        internal Decimal mActualAverage;
        internal String mDiscountReason;
        internal Decimal mAddd;
        internal Decimal mDisc;
        internal String mEmployeeName;
        #endregion

        #region "Methods"
        public Int32 EmployeeID
        {
            get { return mEmployeeID; }
            set { mEmployeeID = value; }
        }
        public Decimal NetSalary
        {
            get { return mNetSalary; }
            set { mNetSalary = value; }
        }
        public Decimal advances
        {
            get { return madvances; }
            set { madvances = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Decimal Extra
        {
            get { return mExtra; }
            set { mExtra = value; }
        }
        public Decimal Salary
        {
            get { return mSalary; }
            set { mSalary = value; }
        }
        public Int32 EmployeesTransactionID
        {
            get { return mEmployeesTransactionID; }
            set { mEmployeesTransactionID = value; }
        }
        public Boolean isOut
        {
            get { return misOut; }
            set { misOut = value; }
        }
        public Int32 CartoonID
        {
            get { return mCartoonID; }
            set { mCartoonID = value; }
        }
        public Decimal Average
        {
            get { return mAverage; }
            set { mAverage = value; }
        }
        public Decimal ActualAverage
        {
            get { return mActualAverage; }
            set { mActualAverage = value; }
        }
        public String DiscountReason
        {
            get { return mDiscountReason; }
            set { mDiscountReason = value; }
        }
        public Decimal Addd
        {
            get { return mAddd; }
            set { mAddd = value; }
        }
        public Decimal Disc
        {
            get { return mDisc; }
            set { mDisc = value; }
        }
        public String EmployeeName
        {
            get { return mEmployeeName; }
            set { mEmployeeName = value; }
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

    public partial class CvwGetST_EmployeesTransactionDetails
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
        public List<CVarvwGetST_EmployeesTransactionDetails> lstCVarvwGetST_EmployeesTransactionDetails = new List<CVarvwGetST_EmployeesTransactionDetails>();
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
            lstCVarvwGetST_EmployeesTransactionDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwGetST_EmployeesTransactionDetails";
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
                        CVarvwGetST_EmployeesTransactionDetails ObjCVarvwGetST_EmployeesTransactionDetails = new CVarvwGetST_EmployeesTransactionDetails();
                        ObjCVarvwGetST_EmployeesTransactionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mNetSalary = Convert.ToDecimal(dr["NetSalary"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.madvances = Convert.ToDecimal(dr["advances"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mExtra = Convert.ToDecimal(dr["Extra"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeesTransactionID = Convert.ToInt32(dr["EmployeesTransactionID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.misOut = Convert.ToBoolean(dr["isOut"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mAverage = Convert.ToDecimal(dr["Average"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mActualAverage = Convert.ToDecimal(dr["ActualAverage"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mAddd = Convert.ToDecimal(dr["Addd"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDisc = Convert.ToDecimal(dr["Disc"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeeName = Convert.ToString(dr["EmployeeName"].ToString());
                        lstCVarvwGetST_EmployeesTransactionDetails.Add(ObjCVarvwGetST_EmployeesTransactionDetails);
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
            lstCVarvwGetST_EmployeesTransactionDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwGetST_EmployeesTransactionDetails";
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
                        CVarvwGetST_EmployeesTransactionDetails ObjCVarvwGetST_EmployeesTransactionDetails = new CVarvwGetST_EmployeesTransactionDetails();
                        ObjCVarvwGetST_EmployeesTransactionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mNetSalary = Convert.ToDecimal(dr["NetSalary"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.madvances = Convert.ToDecimal(dr["advances"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mExtra = Convert.ToDecimal(dr["Extra"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeesTransactionID = Convert.ToInt32(dr["EmployeesTransactionID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.misOut = Convert.ToBoolean(dr["isOut"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mAverage = Convert.ToDecimal(dr["Average"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mActualAverage = Convert.ToDecimal(dr["ActualAverage"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mAddd = Convert.ToDecimal(dr["Addd"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mDisc = Convert.ToDecimal(dr["Disc"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetails.mEmployeeName = Convert.ToString(dr["EmployeeName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwGetST_EmployeesTransactionDetails.Add(ObjCVarvwGetST_EmployeesTransactionDetails);
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
