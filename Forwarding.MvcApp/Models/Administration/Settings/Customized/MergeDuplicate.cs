using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
// the Model for connect with [dbo].[MergeDuplicate] procedure 
// [dbo].[MergeDuplicate] : Merge duplicate items base on Itemtype"customers , subaccounts , ....... etc" 
namespace Forwarding.MvcApp.Models.Administration.Settings.Customized
{
    [Serializable]
    public class CPKMergeDuplicate
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarMergeDuplicate : CPKMergeDuplicate
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

    public partial class CMergeDuplicate
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
        public List<CVarMergeDuplicate> lstCVarMergeDuplicate = new List<CVarMergeDuplicate>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception MergeDuplicate(int pItemType, string pDuplicateItemsIDs, int pDestinationItemID, int userid, DateTime mergedate , string SubAccountsIDs_ForDuplicateItems , int SubAccountsID_ForDestinationItem)
        {
            return ExeMergeDuplicate(pItemType, pDuplicateItemsIDs, pDestinationItemID, userid, mergedate, SubAccountsIDs_ForDuplicateItems , SubAccountsID_ForDestinationItem , true);
        }

        private Exception ExeMergeDuplicate(int pItemType, string pDuplicateItemsIDs, int pDestinationItemID, int puserid, DateTime pmergedate, string pSubAccountsIDs_ForDuplicateItems, int pSubAccountsID_ForDestinationItem , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarMergeDuplicate.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@ItemType", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@DuplicateItemsIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@DestinationItemID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@MergeDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@SubAccountsID_ForDuplicateItems", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccountID_ForDestinationItem", SqlDbType.Int));
                    Com.CommandText = "[dbo].[MergeDuplicate]";
                    Com.Parameters[0].Value = pItemType;
                    Com.Parameters[1].Value = pDuplicateItemsIDs;
                    Com.Parameters[2].Value = pDestinationItemID;
                    Com.Parameters[3].Value = puserid;
                    Com.Parameters[4].Value = pmergedate;
                    Com.Parameters[5].Value = pSubAccountsIDs_ForDuplicateItems;
                    Com.Parameters[6].Value = pSubAccountsID_ForDestinationItem;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    //  while (dr.Read())
                    //  {
                    /*Start DataReader*/
                    // CVarMergeDuplicate ObjCVarMergeDuplicate = new CVarMergeDuplicate();
                    // ObjCVarMergeDuplicate.mIsSucsess = Convert.ToInt32(dr["IsSucsess"].ToString());

                    // lstCVarMergeDuplicate.Add(ObjCVarMergeDuplicate);
                    // }
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
