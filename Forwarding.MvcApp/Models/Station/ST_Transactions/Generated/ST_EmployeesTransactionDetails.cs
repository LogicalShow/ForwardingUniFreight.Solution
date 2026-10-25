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
    public class CPKST_EmployeesTransactionDetails
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
    public partial class CVarST_EmployeesTransactionDetails : CPKST_EmployeesTransactionDetails
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
        #endregion

        #region "Methods"
        public Int32 EmployeeID
        {
            get { return mEmployeeID; }
            set { mIsChanges = true; mEmployeeID = value; }
        }
        public Decimal NetSalary
        {
            get { return mNetSalary; }
            set { mIsChanges = true; mNetSalary = value; }
        }
        public Decimal advances
        {
            get { return madvances; }
            set { mIsChanges = true; madvances = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mIsChanges = true; mDiscount = value; }
        }
        public Decimal Extra
        {
            get { return mExtra; }
            set { mIsChanges = true; mExtra = value; }
        }
        public Decimal Salary
        {
            get { return mSalary; }
            set { mIsChanges = true; mSalary = value; }
        }
        public Int32 EmployeesTransactionID
        {
            get { return mEmployeesTransactionID; }
            set { mIsChanges = true; mEmployeesTransactionID = value; }
        }
        public Boolean isOut
        {
            get { return misOut; }
            set { mIsChanges = true; misOut = value; }
        }
        public Int32 CartoonID
        {
            get { return mCartoonID; }
            set { mIsChanges = true; mCartoonID = value; }
        }
        public Decimal Average
        {
            get { return mAverage; }
            set { mIsChanges = true; mAverage = value; }
        }
        public Decimal ActualAverage
        {
            get { return mActualAverage; }
            set { mIsChanges = true; mActualAverage = value; }
        }
        public String DiscountReason
        {
            get { return mDiscountReason; }
            set { mIsChanges = true; mDiscountReason = value; }
        }
        public Decimal Addd
        {
            get { return mAddd; }
            set { mIsChanges = true; mAddd = value; }
        }
        public Decimal Disc
        {
            get { return mDisc; }
            set { mIsChanges = true; mDisc = value; }
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

    public partial class CST_EmployeesTransactionDetails
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
        public List<CVarST_EmployeesTransactionDetails> lstCVarST_EmployeesTransactionDetails = new List<CVarST_EmployeesTransactionDetails>();
        public List<CPKST_EmployeesTransactionDetails> lstDeletedCPKST_EmployeesTransactionDetails = new List<CPKST_EmployeesTransactionDetails>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarST_EmployeesTransactionDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_EmployeesTransactionDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_EmployeesTransactionDetails";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarST_EmployeesTransactionDetails ObjCVarST_EmployeesTransactionDetails = new CVarST_EmployeesTransactionDetails();
                        ObjCVarST_EmployeesTransactionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mNetSalary = Convert.ToDecimal(dr["NetSalary"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.madvances = Convert.ToDecimal(dr["advances"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mExtra = Convert.ToDecimal(dr["Extra"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mEmployeesTransactionID = Convert.ToInt32(dr["EmployeesTransactionID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.misOut = Convert.ToBoolean(dr["isOut"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mAverage = Convert.ToDecimal(dr["Average"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mActualAverage = Convert.ToDecimal(dr["ActualAverage"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mAddd = Convert.ToDecimal(dr["Addd"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDisc = Convert.ToDecimal(dr["Disc"].ToString());
                        lstCVarST_EmployeesTransactionDetails.Add(ObjCVarST_EmployeesTransactionDetails);
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
            lstCVarST_EmployeesTransactionDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_EmployeesTransactionDetails";
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
                        CVarST_EmployeesTransactionDetails ObjCVarST_EmployeesTransactionDetails = new CVarST_EmployeesTransactionDetails();
                        ObjCVarST_EmployeesTransactionDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mEmployeeID = Convert.ToInt32(dr["EmployeeID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mNetSalary = Convert.ToDecimal(dr["NetSalary"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.madvances = Convert.ToDecimal(dr["advances"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mExtra = Convert.ToDecimal(dr["Extra"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mEmployeesTransactionID = Convert.ToInt32(dr["EmployeesTransactionID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.misOut = Convert.ToBoolean(dr["isOut"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mCartoonID = Convert.ToInt32(dr["CartoonID"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mAverage = Convert.ToDecimal(dr["Average"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mActualAverage = Convert.ToDecimal(dr["ActualAverage"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDiscountReason = Convert.ToString(dr["DiscountReason"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mAddd = Convert.ToDecimal(dr["Addd"].ToString());
                        ObjCVarST_EmployeesTransactionDetails.mDisc = Convert.ToDecimal(dr["Disc"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_EmployeesTransactionDetails.Add(ObjCVarST_EmployeesTransactionDetails);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListST_EmployeesTransactionDetails";
                else
                    Com.CommandText = "[dbo].UpdateListST_EmployeesTransactionDetails";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKST_EmployeesTransactionDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_EmployeesTransactionDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKST_EmployeesTransactionDetails ObjCPKST_EmployeesTransactionDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_EmployeesTransactionDetails.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarST_EmployeesTransactionDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@EmployeeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NetSalary", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@advances", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Extra", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Salary", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@EmployeesTransactionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@isOut", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CartoonID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Average", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ActualAverage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountReason", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Addd", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Disc", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_EmployeesTransactionDetails ObjCVarST_EmployeesTransactionDetails in SaveList)
                {
                    if (ObjCVarST_EmployeesTransactionDetails.mIsChanges == true)
                    {
                        if (ObjCVarST_EmployeesTransactionDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_EmployeesTransactionDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_EmployeesTransactionDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_EmployeesTransactionDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_EmployeesTransactionDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_EmployeesTransactionDetails.ID;
                        }
                        Com.Parameters["@EmployeeID"].Value = ObjCVarST_EmployeesTransactionDetails.EmployeeID;
                        Com.Parameters["@NetSalary"].Value = ObjCVarST_EmployeesTransactionDetails.NetSalary;
                        Com.Parameters["@advances"].Value = ObjCVarST_EmployeesTransactionDetails.advances;
                        Com.Parameters["@Discount"].Value = ObjCVarST_EmployeesTransactionDetails.Discount;
                        Com.Parameters["@Extra"].Value = ObjCVarST_EmployeesTransactionDetails.Extra;
                        Com.Parameters["@Salary"].Value = ObjCVarST_EmployeesTransactionDetails.Salary;
                        Com.Parameters["@EmployeesTransactionID"].Value = ObjCVarST_EmployeesTransactionDetails.EmployeesTransactionID;
                        Com.Parameters["@isOut"].Value = ObjCVarST_EmployeesTransactionDetails.isOut;
                        Com.Parameters["@CartoonID"].Value = ObjCVarST_EmployeesTransactionDetails.CartoonID;
                        Com.Parameters["@Average"].Value = ObjCVarST_EmployeesTransactionDetails.Average;
                        Com.Parameters["@ActualAverage"].Value = ObjCVarST_EmployeesTransactionDetails.ActualAverage;
                        Com.Parameters["@DiscountReason"].Value = ObjCVarST_EmployeesTransactionDetails.DiscountReason;
                        Com.Parameters["@Addd"].Value = ObjCVarST_EmployeesTransactionDetails.Addd;
                        Com.Parameters["@Disc"].Value = ObjCVarST_EmployeesTransactionDetails.Disc;
                        EndTrans(Com, Con);
                        if (ObjCVarST_EmployeesTransactionDetails.ID == 0)
                        {
                            ObjCVarST_EmployeesTransactionDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_EmployeesTransactionDetails.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}
