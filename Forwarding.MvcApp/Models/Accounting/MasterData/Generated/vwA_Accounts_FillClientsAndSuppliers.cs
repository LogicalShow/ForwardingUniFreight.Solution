using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwA_Accounts_FillClientsAndSuppliers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mName;
        internal String mSubAccount_Number;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String SubAccount_Number
        {
            get { return mSubAccount_Number; }
            set { mSubAccount_Number = value; }
        }
        #endregion
    }

    public partial class CvwA_Accounts_FillClientsAndSuppliers
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
        public List<CVarvwA_Accounts_FillClientsAndSuppliers> lstCVarvwA_Accounts_FillClientsAndSuppliers = new List<CVarvwA_Accounts_FillClientsAndSuppliers>();
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
            lstCVarvwA_Accounts_FillClientsAndSuppliers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SubAccount_Number", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].A_MainAccounts_FillClientsAndSuppliers";
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
                        CVarvwA_Accounts_FillClientsAndSuppliers ObjCVarvwA_Accounts_FillClientsAndSuppliers = new CVarvwA_Accounts_FillClientsAndSuppliers();
                        ObjCVarvwA_Accounts_FillClientsAndSuppliers.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_Accounts_FillClientsAndSuppliers.mName = Convert.ToString(dr["Name"].ToString());
                        lstCVarvwA_Accounts_FillClientsAndSuppliers.Add(ObjCVarvwA_Accounts_FillClientsAndSuppliers);
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
            lstCVarvwA_Accounts_FillClientsAndSuppliers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_Accounts_FillClientsAndSuppliers";
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
                        CVarvwA_Accounts_FillClientsAndSuppliers ObjCVarvwA_Accounts_FillClientsAndSuppliers = new CVarvwA_Accounts_FillClientsAndSuppliers();
                        ObjCVarvwA_Accounts_FillClientsAndSuppliers.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_Accounts_FillClientsAndSuppliers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_Accounts_FillClientsAndSuppliers.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_Accounts_FillClientsAndSuppliers.Add(ObjCVarvwA_Accounts_FillClientsAndSuppliers);
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
