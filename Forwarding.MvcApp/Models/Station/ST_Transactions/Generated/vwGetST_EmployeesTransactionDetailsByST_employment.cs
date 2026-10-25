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
    public class CPKvwGetST_EmployeesTransactionDetailsByST_employment
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
    public partial class CVarvwGetST_EmployeesTransactionDetailsByST_employment : CPKvwGetST_EmployeesTransactionDetailsByST_employment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mEmployeeID;
        internal Int32 madvances;
        internal Int32 mDiscount;
        internal Int32 mExtra;
        internal Int32 misOut;
        internal String mEmployeeName;
        internal Int32 mCartoonID;
        internal Int32 mAverage;
        internal Int32 mActualAverage;
        internal String mDiscountReason;
        internal Int32 mcategory;
        internal Int32 mshiftEmp;
        internal Int32 mAddd;
        internal Int32 mDisc;
        #endregion

        #region "Methods"
        public Int32 EmployeeID
        {
            get { return mEmployeeID; }
            set { mEmployeeID = value; }
        }
        public Int32 advances
        {
            get { return madvances; }
            set { madvances = value; }
        }
        public Int32 Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Int32 Extra
        {
            get { return mExtra; }
            set { mExtra = value; }
        }
        public Int32 isOut
        {
            get { return misOut; }
            set { misOut = value; }
        }
        public String EmployeeName
        {
            get { return mEmployeeName; }
            set { mEmployeeName = value; }
        }
        public Int32 CartoonID
        {
            get { return mCartoonID; }
            set { mCartoonID = value; }
        }
        public Int32 Average
        {
            get { return mAverage; }
            set { mAverage = value; }
        }
        public Int32 ActualAverage
        {
            get { return mActualAverage; }
            set { mActualAverage = value; }
        }
        public String DiscountReason
        {
            get { return mDiscountReason; }
            set { mDiscountReason = value; }
        }
        public Int32 category
        {
            get { return mcategory; }
            set { mcategory = value; }
        }
        public Int32 shiftEmp
        {
            get { return mshiftEmp; }
            set { mshiftEmp = value; }
        }
        public Int32 Addd
        {
            get { return mAddd; }
            set { mAddd = value; }
        }
        public Int32 Disc
        {
            get { return mDisc; }
            set { mDisc = value; }
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

    public partial class CvwGetST_EmployeesTransactionDetailsByST_employment
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
        public List<CVarvwGetST_EmployeesTransactionDetailsByST_employment> lstCVarvwGetST_EmployeesTransactionDetailsByST_employment = new List<CVarvwGetST_EmployeesTransactionDetailsByST_employment>();
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
            lstCVarvwGetST_EmployeesTransactionDetailsByST_employment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwGetST_EmployeesTransactionDetailsByST_employment";
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
                        CVarvwGetST_EmployeesTransactionDetailsByST_employment ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment = new CVarvwGetST_EmployeesTransactionDetailsByST_employment();
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.madvances = Convert.ToInt32(dr["advances"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDiscount = Convert.ToInt32(dr["Discount"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mExtra = Convert.ToInt32(dr["Extra"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.misOut = Convert.ToInt32(dr["isOut"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mEmployeeName = Convert.ToString(dr["EmployeeName"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mAverage = Convert.ToInt32(dr["Average"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mActualAverage = Convert.ToInt32(dr["ActualAverage"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mcategory = Convert.ToInt32(dr["category"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mshiftEmp = Convert.ToInt32(dr["shiftEmp"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mAddd = Convert.ToInt32(dr["Addd"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDisc = Convert.ToInt32(dr["Disc"].ToString());
                        lstCVarvwGetST_EmployeesTransactionDetailsByST_employment.Add(ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment);
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
            lstCVarvwGetST_EmployeesTransactionDetailsByST_employment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwGetST_EmployeesTransactionDetailsByST_employment";
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
                        CVarvwGetST_EmployeesTransactionDetailsByST_employment ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment = new CVarvwGetST_EmployeesTransactionDetailsByST_employment();
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.madvances = Convert.ToInt32(dr["advances"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDiscount = Convert.ToInt32(dr["Discount"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mExtra = Convert.ToInt32(dr["Extra"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.misOut = Convert.ToInt32(dr["isOut"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mEmployeeName = Convert.ToString(dr["EmployeeName"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mAverage = Convert.ToInt32(dr["Average"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mActualAverage = Convert.ToInt32(dr["ActualAverage"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mcategory = Convert.ToInt32(dr["category"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mshiftEmp = Convert.ToInt32(dr["shiftEmp"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mAddd = Convert.ToInt32(dr["Addd"].ToString());
                        ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment.mDisc = Convert.ToInt32(dr["Disc"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwGetST_EmployeesTransactionDetailsByST_employment.Add(ObjCVarvwGetST_EmployeesTransactionDetailsByST_employment);
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
