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
    public class CPKA_CashFlowDetails
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
    public partial class CVarA_CashFlowDetails : CPKA_CashFlowDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCashFlowID;
        internal Int32 mAccount_ID;
        internal Int32 mType;
        internal Boolean mSign;
        #endregion

        #region "Methods"
        public Int32 CashFlowID
        {
            get { return mCashFlowID; }
            set { mIsChanges = true; mCashFlowID = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mIsChanges = true; mAccount_ID = value; }
        }
        public Int32 Type
        {
            get { return mType; }
            set { mIsChanges = true; mType = value; }
        }
        public Boolean Sign
        {
            get { return mSign; }
            set { mIsChanges = true; mSign = value; }
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

    public partial class CA_CashFlowDetails
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
        public List<CVarA_CashFlowDetails> lstCVarA_CashFlowDetails = new List<CVarA_CashFlowDetails>();
        public List<CPKA_CashFlowDetails> lstDeletedCPKA_CashFlowDetails = new List<CPKA_CashFlowDetails>();
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
            lstCVarA_CashFlowDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_CashFlowDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_CashFlowDetails";
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
                        CVarA_CashFlowDetails ObjCVarA_CashFlowDetails = new CVarA_CashFlowDetails();
                        ObjCVarA_CashFlowDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_CashFlowDetails.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarA_CashFlowDetails.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_CashFlowDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarA_CashFlowDetails.mSign = Convert.ToBoolean(dr["Sign"].ToString());
                        lstCVarA_CashFlowDetails.Add(ObjCVarA_CashFlowDetails);
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
            lstCVarA_CashFlowDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_CashFlowDetails";
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
                        CVarA_CashFlowDetails ObjCVarA_CashFlowDetails = new CVarA_CashFlowDetails();
                        ObjCVarA_CashFlowDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_CashFlowDetails.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarA_CashFlowDetails.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_CashFlowDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarA_CashFlowDetails.mSign = Convert.ToBoolean(dr["Sign"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_CashFlowDetails.Add(ObjCVarA_CashFlowDetails);
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
                    Com.CommandText = "[dbo].DeleteListA_CashFlowDetails";
                else
                    Com.CommandText = "[dbo].UpdateListA_CashFlowDetails";
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
        public Exception DeleteItem(List<CPKA_CashFlowDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_CashFlowDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_CashFlowDetails ObjCPKA_CashFlowDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_CashFlowDetails.ID);
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
        public Exception SaveMethod(List<CVarA_CashFlowDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CashFlowID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Type", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Sign", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_CashFlowDetails ObjCVarA_CashFlowDetails in SaveList)
                {
                    if (ObjCVarA_CashFlowDetails.mIsChanges == true)
                    {
                        if (ObjCVarA_CashFlowDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_CashFlowDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_CashFlowDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_CashFlowDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_CashFlowDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_CashFlowDetails.ID;
                        }
                        Com.Parameters["@CashFlowID"].Value = ObjCVarA_CashFlowDetails.CashFlowID;
                        Com.Parameters["@Account_ID"].Value = ObjCVarA_CashFlowDetails.Account_ID;
                        Com.Parameters["@Type"].Value = ObjCVarA_CashFlowDetails.Type;
                        Com.Parameters["@Sign"].Value = ObjCVarA_CashFlowDetails.Sign;
                        EndTrans(Com, Con);
                        if (ObjCVarA_CashFlowDetails.ID == 0)
                        {
                            ObjCVarA_CashFlowDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_CashFlowDetails.mIsChanges = false;
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
