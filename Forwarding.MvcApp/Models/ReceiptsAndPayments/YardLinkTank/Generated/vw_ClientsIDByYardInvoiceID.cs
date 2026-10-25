using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated
{
    [Serializable]
    public partial class CVarvw_ClientsIDByYardInvoiceID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mClientName;
        internal String mCode;
        internal Int64 mInvoiceID;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int32 mPartnerTypeID;
        internal Int32 mPartnerID;
        internal Int32 mERPClientID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public Int32 ERPClientID
        {
            get { return mERPClientID; }
            set { mERPClientID = value; }
        }
        #endregion
    }


    public partial class Cvw_ClientsIDByYardInvoiceID
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
        public List<CVarvw_ClientsIDByYardInvoiceID> lstCVarvw_ClientsIDByYardInvoiceID = new List<CVarvw_ClientsIDByYardInvoiceID>();
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
            lstCVarvw_ClientsIDByYardInvoiceID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_ClientsIDByYardLinkTankInvoiceID";
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
                        CVarvw_ClientsIDByYardInvoiceID ObjCVarvw_ClientsIDByYardInvoiceID = new CVarvw_ClientsIDByYardInvoiceID();
                        ObjCVarvw_ClientsIDByYardInvoiceID.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mERPClientID = Convert.ToInt32(dr["ERPClientID"].ToString());
                        lstCVarvw_ClientsIDByYardInvoiceID.Add(ObjCVarvw_ClientsIDByYardInvoiceID);
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
            lstCVarvw_ClientsIDByYardInvoiceID.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_ClientsIDByYardInvoiceID";
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
                        CVarvw_ClientsIDByYardInvoiceID ObjCVarvw_ClientsIDByYardInvoiceID = new CVarvw_ClientsIDByYardInvoiceID();
                        ObjCVarvw_ClientsIDByYardInvoiceID.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvw_ClientsIDByYardInvoiceID.mERPClientID = Convert.ToInt32(dr["ERPClientID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_ClientsIDByYardInvoiceID.Add(ObjCVarvw_ClientsIDByYardInvoiceID);
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
