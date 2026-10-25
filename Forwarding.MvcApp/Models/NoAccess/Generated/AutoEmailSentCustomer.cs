using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable] 
    public class CPKAutoEmailSentCustomer
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarAutoEmailSentCustomer : CPKAutoEmailSentCustomer
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCustomerID;
        internal String mEmailType;
        internal Int32 mSentYear;
        internal Int32 mSentMonth;
        internal Boolean mIsFirstHalf;
        internal Boolean mIsSecondHalf;
        internal DateTime mCreationDate;
        #endregion

        #region "Methods"
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public String EmailType
        {
            get { return mEmailType; }
            set { mIsChanges = true; mEmailType = value; }
        }
        public Int32 SentYear
        {
            get { return mSentYear; }
            set { mIsChanges = true; mSentYear = value; }
        }
        public Int32 SentMonth
        {
            get { return mSentMonth; }
            set { mIsChanges = true; mSentMonth = value; }
        }
        public Boolean IsFirstHalf
        {
            get { return mIsFirstHalf; }
            set { mIsChanges = true; mIsFirstHalf = value; }
        }
        public Boolean IsSecondHalf
        {
            get { return mIsSecondHalf; }
            set { mIsChanges = true; mIsSecondHalf = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
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

    public partial class CAutoEmailSentCustomer
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
        public List<CVarAutoEmailSentCustomer> lstCVarAutoEmailSentCustomer = new List<CVarAutoEmailSentCustomer>();
        public List<CPKAutoEmailSentCustomer> lstDeletedCPKAutoEmailSentCustomer = new List<CPKAutoEmailSentCustomer>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarAutoEmailSentCustomer.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAutoEmailSentCustomer";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAutoEmailSentCustomer";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarAutoEmailSentCustomer ObjCVarAutoEmailSentCustomer = new CVarAutoEmailSentCustomer();
                        ObjCVarAutoEmailSentCustomer.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoEmailSentCustomer.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAutoEmailSentCustomer.mEmailType = Convert.ToString(dr["EmailType"].ToString());
                        ObjCVarAutoEmailSentCustomer.mSentYear = Convert.ToInt32(dr["SentYear"].ToString());
                        ObjCVarAutoEmailSentCustomer.mSentMonth = Convert.ToInt32(dr["SentMonth"].ToString());
                        ObjCVarAutoEmailSentCustomer.mIsFirstHalf = Convert.ToBoolean(dr["IsFirstHalf"].ToString());
                        ObjCVarAutoEmailSentCustomer.mIsSecondHalf = Convert.ToBoolean(dr["IsSecondHalf"].ToString());
                        ObjCVarAutoEmailSentCustomer.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarAutoEmailSentCustomer.Add(ObjCVarAutoEmailSentCustomer);
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
            lstCVarAutoEmailSentCustomer.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAutoEmailSentCustomer";
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
                        CVarAutoEmailSentCustomer ObjCVarAutoEmailSentCustomer = new CVarAutoEmailSentCustomer();
                        ObjCVarAutoEmailSentCustomer.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAutoEmailSentCustomer.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAutoEmailSentCustomer.mEmailType = Convert.ToString(dr["EmailType"].ToString());
                        ObjCVarAutoEmailSentCustomer.mSentYear = Convert.ToInt32(dr["SentYear"].ToString());
                        ObjCVarAutoEmailSentCustomer.mSentMonth = Convert.ToInt32(dr["SentMonth"].ToString());
                        ObjCVarAutoEmailSentCustomer.mIsFirstHalf = Convert.ToBoolean(dr["IsFirstHalf"].ToString());
                        ObjCVarAutoEmailSentCustomer.mIsSecondHalf = Convert.ToBoolean(dr["IsSecondHalf"].ToString());
                        ObjCVarAutoEmailSentCustomer.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAutoEmailSentCustomer.Add(ObjCVarAutoEmailSentCustomer);
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
                    Com.CommandText = "[dbo].DeleteListAutoEmailSentCustomer";
                else
                    Com.CommandText = "[dbo].UpdateListAutoEmailSentCustomer";
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
        public Exception DeleteItem(List<CPKAutoEmailSentCustomer> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAutoEmailSentCustomer";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAutoEmailSentCustomer ObjCPKAutoEmailSentCustomer in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAutoEmailSentCustomer.ID);
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
        public Exception SaveMethod(List<CVarAutoEmailSentCustomer> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SentYear", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SentMonth", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsFirstHalf", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsSecondHalf", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAutoEmailSentCustomer ObjCVarAutoEmailSentCustomer in SaveList)
                {
                    if (ObjCVarAutoEmailSentCustomer.mIsChanges == true)
                    {
                        if (ObjCVarAutoEmailSentCustomer.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAutoEmailSentCustomer";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAutoEmailSentCustomer.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAutoEmailSentCustomer";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAutoEmailSentCustomer.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAutoEmailSentCustomer.ID;
                        }
                        Com.Parameters["@CustomerID"].Value = ObjCVarAutoEmailSentCustomer.CustomerID;
                        Com.Parameters["@EmailType"].Value = ObjCVarAutoEmailSentCustomer.EmailType;
                        Com.Parameters["@SentYear"].Value = ObjCVarAutoEmailSentCustomer.SentYear;
                        Com.Parameters["@SentMonth"].Value = ObjCVarAutoEmailSentCustomer.SentMonth;
                        Com.Parameters["@IsFirstHalf"].Value = ObjCVarAutoEmailSentCustomer.IsFirstHalf;
                        Com.Parameters["@IsSecondHalf"].Value = ObjCVarAutoEmailSentCustomer.IsSecondHalf;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAutoEmailSentCustomer.CreationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarAutoEmailSentCustomer.ID == 0)
                        {
                            ObjCVarAutoEmailSentCustomer.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAutoEmailSentCustomer.mIsChanges = false;
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
