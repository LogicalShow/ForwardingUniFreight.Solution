using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public partial class CVarvwAccAgingPayables
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionType;
        internal Int32 mPartnerID;
        internal Int32 mPartnerTypeID;
        internal String mPartnerName;
        internal String mPartnerTypeCode;
        internal String mLate;
        internal String mZeroTo30;
        internal String mThirtyOneTo60;
        internal String mSixtyOneTo90;
        #endregion

        #region "Methods"
        public Int32 TransactionType
        {
            get { return mTransactionType; }
            set { mTransactionType = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public String Late
        {
            get { return mLate; }
            set { mLate = value; }
        }
        public String ZeroTo30
        {
            get { return mZeroTo30; }
            set { mZeroTo30 = value; }
        }
        public String ThirtyOneTo60
        {
            get { return mThirtyOneTo60; }
            set { mThirtyOneTo60 = value; }
        }
        public String SixtyOneTo90
        {
            get { return mSixtyOneTo90; }
            set { mSixtyOneTo90 = value; }
        }
        #endregion
    }

    public partial class CvwAccAgingPayables
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
        public List<CVarvwAccAgingPayables> lstCVarvwAccAgingPayables = new List<CVarvwAccAgingPayables>();
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
            lstCVarvwAccAgingPayables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccAgingPayables";
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
                        CVarvwAccAgingPayables ObjCVarvwAccAgingPayables = new CVarvwAccAgingPayables();
                        ObjCVarvwAccAgingPayables.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccAgingPayables.mLate = Convert.ToString(dr["Late"].ToString());
                        ObjCVarvwAccAgingPayables.mZeroTo30 = Convert.ToString(dr["ZeroTo30"].ToString());
                        ObjCVarvwAccAgingPayables.mThirtyOneTo60 = Convert.ToString(dr["ThirtyOneTo60"].ToString());
                        ObjCVarvwAccAgingPayables.mSixtyOneTo90 = Convert.ToString(dr["SixtyOneTo90"].ToString());
                        lstCVarvwAccAgingPayables.Add(ObjCVarvwAccAgingPayables);
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
            lstCVarvwAccAgingPayables.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccAgingPayables";
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
                        CVarvwAccAgingPayables ObjCVarvwAccAgingPayables = new CVarvwAccAgingPayables();
                        ObjCVarvwAccAgingPayables.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccAgingPayables.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccAgingPayables.mLate = Convert.ToString(dr["Late"].ToString());
                        ObjCVarvwAccAgingPayables.mZeroTo30 = Convert.ToString(dr["ZeroTo30"].ToString());
                        ObjCVarvwAccAgingPayables.mThirtyOneTo60 = Convert.ToString(dr["ThirtyOneTo60"].ToString());
                        ObjCVarvwAccAgingPayables.mSixtyOneTo90 = Convert.ToString(dr["SixtyOneTo90"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccAgingPayables.Add(ObjCVarvwAccAgingPayables);
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
