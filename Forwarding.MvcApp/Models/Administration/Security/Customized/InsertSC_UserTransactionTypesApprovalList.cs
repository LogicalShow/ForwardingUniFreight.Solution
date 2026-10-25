using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
// the Model for connect with [dbo].[InsertSC_UserTransactionTypesApprovalList] procedure 
// [dbo].[InsertSC_UserTransactionTypesApprovalList] : Merge duplicate items base on Itemtype"customers , subaccounts , ....... etc" 
namespace Forwarding.MvcApp.Models.Administration.Settings.Customized
{
    [Serializable]
    public class CPKInsertSC_UserTransactionTypesApprovalList
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarInsertSC_UserTransactionTypesApprovalList : CPKInsertSC_UserTransactionTypesApprovalList
    {
        //#region "variables"
        //internal Int32 mIsSucsess;

        //#endregion

        //#region "Methods"
        //public Int32 IsSucsess
        //{
        //    get { return mIsSucsess; }
        //    set { mIsSucsess = value; }
        //};

        //#endregion

    }

    public partial class CInsertSC_UserTransactionTypesApprovalList
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
        public List<CVarInsertSC_UserTransactionTypesApprovalList> lstCVarInsertSC_UserTransactionTypesApprovalList = new List<CVarInsertSC_UserTransactionTypesApprovalList>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception InsertSC_UserTransactionTypesApprovalList(int pUserID, string pTransactionTypesIDs)
        {
            return ExeInsertSC_UserTransactionTypesApprovalList( pUserID,  pTransactionTypesIDs , true);
        }

        private Exception ExeInsertSC_UserTransactionTypesApprovalList(int pUserID, string pTransactionTypesIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarInsertSC_UserTransactionTypesApprovalList.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@TransactionTypesIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].[InsertSC_UserTransactionTypesApprovalList]";
                    Com.Parameters[0].Value = pUserID;
                    Com.Parameters[1].Value = pTransactionTypesIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
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




    [Serializable]
    public class CPKInsertUserBranches
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarInsertUserBranches : CPKInsertUserBranches
    {
        //#region "variables"
        //internal Int32 mIsSucsess;

        //#endregion

        //#region "Methods"
        //public Int32 IsSucsess
        //{
        //    get { return mIsSucsess; }
        //    set { mIsSucsess = value; }
        //};

        //#endregion

    }

    public partial class CInsertUserBranches
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
        public List<CVarInsertUserBranches> lstCVarInsertUserBranches = new List<CVarInsertUserBranches>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception InsertUserBranches(int pUserID, string pBranchesIDs)
        {
            return ExeInsertUserBranches(pUserID, pBranchesIDs, true);
        }

        private Exception ExeInsertUserBranches(int pUserID, string pBranchesIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarInsertUserBranches.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {

                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@BranchesIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].[InsertUserBranches]";
                    Com.Parameters[0].Value = pUserID;
                    Com.Parameters[1].Value = pBranchesIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
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
