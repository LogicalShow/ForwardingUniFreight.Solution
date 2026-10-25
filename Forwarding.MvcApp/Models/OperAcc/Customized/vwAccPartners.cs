using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public partial class CVarvwAccPartners
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeName;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mUnAllocatedPayables;
        internal String mUnAllocatedReceivables;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeName
        {
            get { return mPartnerTypeName; }
            set { mPartnerTypeName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mLocalName = value; }
        }
        public String UnAllocatedPayables
        {
            get { return mUnAllocatedPayables; }
            set { mUnAllocatedPayables = value; }
        }
        public String UnAllocatedReceivables
        {
            get { return mUnAllocatedReceivables; }
            set { mUnAllocatedReceivables = value; }
        }
        #endregion
    }

    public partial class CvwAccPartners
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
        public List<CVarvwAccPartners> lstCVarvwAccPartners = new List<CVarvwAccPartners>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListFilter(string WhereClause)
        {
            return DataFillFilter(WhereClause);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        public Exception GetListPagingPayableAllocation(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFillPayableAllocation(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwAccPartners.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccPartners";
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
                        CVarvwAccPartners ObjCVarvwAccPartners = new CVarvwAccPartners();
                        ObjCVarvwAccPartners.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwAccPartners.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwAccPartners.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwAccPartners.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedPayables = Convert.ToString(dr["UnAllocatedPayables"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedReceivables = Convert.ToString(dr["UnAllocatedReceivables"].ToString());
                        lstCVarvwAccPartners.Add(ObjCVarvwAccPartners);
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

        private Exception DataFillFilter(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwAccPartners.Clear();
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.CommandText = "[dbo].GetListvwAccPartnersFilter";
                Com.Parameters[0].Value = Param;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        CVarvwAccPartners obj = new CVarvwAccPartners();
                        obj.mID = Convert.ToInt32(dr["ID"].ToString());
                        obj.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        obj.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        obj.mCode = Convert.ToString(dr["Code"].ToString());
                        obj.mName = Convert.ToString(dr["Name"].ToString());
                        obj.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        obj.mUnAllocatedPayables = Convert.ToString(dr["UnAllocatedPayables"].ToString());
                        obj.mUnAllocatedReceivables = Convert.ToString(dr["UnAllocatedReceivables"].ToString());
                        lstCVarvwAccPartners.Add(obj);
                    }
                }
                catch (Exception ex) { Exp = ex; }
                finally { if (dr != null) { dr.Close(); dr.Dispose(); } }
                tr.Commit();
            }
            catch (Exception ex) { Exp = ex; }
            finally { Con.Close(); Con.Dispose(); }
            return Exp;
        }

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwAccPartners.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccPartners";
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
                        CVarvwAccPartners ObjCVarvwAccPartners = new CVarvwAccPartners();
                        ObjCVarvwAccPartners.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwAccPartners.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwAccPartners.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwAccPartners.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedPayables = Convert.ToString(dr["UnAllocatedPayables"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedReceivables = Convert.ToString(dr["UnAllocatedReceivables"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPartners.Add(ObjCVarvwAccPartners);
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
        private Exception DataFillPayableAllocation(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwAccPartners.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccPartnersPayableAllocation";
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
                        CVarvwAccPartners ObjCVarvwAccPartners = new CVarvwAccPartners();
                        ObjCVarvwAccPartners.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPartners.mPartnerTypeName = Convert.ToString(dr["PartnerTypeName"].ToString());
                        ObjCVarvwAccPartners.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwAccPartners.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwAccPartners.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedPayables = Convert.ToString(dr["UnAllocatedPayables"].ToString());
                        ObjCVarvwAccPartners.mUnAllocatedReceivables = Convert.ToString(dr["UnAllocatedReceivables"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPartners.Add(ObjCVarvwAccPartners);
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
