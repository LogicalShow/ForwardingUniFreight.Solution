using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKvwCreditlimitexceptionperiod
    {
        #region "variables"
        private Decimal mID;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwCreditlimitexceptionperiod : CPKvwCreditlimitexceptionperiod
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mDate;
        internal String mcustomerName;
        internal Int32 mcustomerID;
        internal Decimal mLimitID;
        internal Decimal mLimitValue;
        internal Decimal mTotalLimit;
        internal Decimal mAfter90;
        internal Decimal mBalance;
        #endregion

        #region "Methods"
        public DateTime Date
        {
            get { return mDate; }
            set { mDate = value; }
        }
        public String customerName
        {
            get { return mcustomerName; }
            set { mcustomerName = value; }
        }
        public Int32 customerID
        {
            get { return mcustomerID; }
            set { mcustomerID = value; }
        }
        public Decimal LimitID
        {
            get { return mLimitID; }
            set { mLimitID = value; }
        }
        public Decimal LimitValue
        {
            get { return mLimitValue; }
            set { mLimitValue = value; }
        }
        public Decimal TotalLimit
        {
            get { return mTotalLimit; }
            set { mTotalLimit = value; }
        }
        public Decimal After90
        {
            get { return mAfter90; }
            set { mAfter90 = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
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

    public partial class CvwCreditlimitexceptionperiod
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
        public List<CVarvwCreditlimitexceptionperiod> lstCVarvwCreditlimitexceptionperiod = new List<CVarvwCreditlimitexceptionperiod>();
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
            lstCVarvwCreditlimitexceptionperiod.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCreditlimitexceptionperiod";
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
                        CVarvwCreditlimitexceptionperiod ObjCVarvwCreditlimitexceptionperiod = new CVarvwCreditlimitexceptionperiod();
                        ObjCVarvwCreditlimitexceptionperiod.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mcustomerName = Convert.ToString(dr["customerName"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mcustomerID = Convert.ToInt32(dr["customerID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mLimitID = Convert.ToDecimal(dr["LimitID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mLimitValue = Convert.ToDecimal(dr["LimitValue"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mTotalLimit = Convert.ToDecimal(dr["TotalLimit"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mAfter90 = Convert.ToDecimal(dr["After90"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        lstCVarvwCreditlimitexceptionperiod.Add(ObjCVarvwCreditlimitexceptionperiod);
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
            lstCVarvwCreditlimitexceptionperiod.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCreditlimitexceptionperiod";
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
                        CVarvwCreditlimitexceptionperiod ObjCVarvwCreditlimitexceptionperiod = new CVarvwCreditlimitexceptionperiod();
                        ObjCVarvwCreditlimitexceptionperiod.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mcustomerName = Convert.ToString(dr["customerName"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mcustomerID = Convert.ToInt32(dr["customerID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mLimitID = Convert.ToDecimal(dr["LimitID"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mLimitValue = Convert.ToDecimal(dr["LimitValue"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mTotalLimit = Convert.ToDecimal(dr["TotalLimit"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mAfter90 = Convert.ToDecimal(dr["After90"].ToString());
                        ObjCVarvwCreditlimitexceptionperiod.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCreditlimitexceptionperiod.Add(ObjCVarvwCreditlimitexceptionperiod);
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
